package egovframework.com.cmm.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.CtasService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovBasicLogger;
import egovframework.com.cmm.util.EgovResourceCloseHelper;
import egovframework.com.cmm.util.EgovUserDetailsHelper;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 파일 다운로드를 위한 컨트롤러 클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일      	수정자           수정내용
 *  ------------   --------    ---------------------------
 *   2009.03.25  	이삼섭          최초 생성
 *   2014.02.24		이기하          IE11 브라우저 한글 파일 다운로드시 에러 수정
 *
 * Copyright (C) 2009 by MOPAS  All right reserved.
 * </pre>
 */
@Controller
public class EgovFileDownloadController {

	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileService;

	/**
	 * 브라우저 구분 얻기.
	 *
	 * @param request
	 * @return
	 */
	private String getBrowser(HttpServletRequest request) {
		String header = request.getHeader("User-Agent");
		if (header.indexOf("MSIE") > -1) {
			return "MSIE";
		} else if (header.indexOf("Trident") > -1) { // IE11 문자열 깨짐 방지
			return "Trident";
		} else if (header.indexOf("Chrome") > -1) {
			return "Chrome";
		} else if (header.indexOf("Opera") > -1) {
			return "Opera";
		}
		return "Firefox";
	}

	/**
	 * Disposition 지정하기.
	 *
	 * @param filename
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	private void setDisposition(String filename, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String browser = getBrowser(request);

		String dispositionPrefix = "attachment; filename=";
		String encodedFilename = null;

		if (browser.equals("MSIE")) {
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Trident")) { // IE11 문자열 깨짐 방지
			encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		} else if (browser.equals("Firefox")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Opera")) {
			encodedFilename = "\"" + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		} else if (browser.equals("Chrome")) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < filename.length(); i++) {
				char c = filename.charAt(i);
				if (c > '~') {
					sb.append(URLEncoder.encode("" + c, "UTF-8"));
				} else {
					sb.append(c);
				}
			}
			encodedFilename = sb.toString();
		} else {
			throw new IOException("Not supported browser");
		}

		response.setHeader("Content-Disposition", dispositionPrefix + encodedFilename);

		if ("Opera".equals(browser)) {
			response.setContentType("application/octet-stream;charset=UTF-8");
		}
	}

	/**
	 * 첨부파일로 등록된 파일에 대하여 다운로드를 제공한다.
	 *
	 * @param commandMap
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/cmm/fms/FileDown.do")
	public void cvplFileDownload(@RequestParam Map<String, Object> commandMap, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String atchFileId = (String) commandMap.get("atchFileId");
		String fileSn = (String) commandMap.get("fileSn");

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {

			FileVO fileVO = new FileVO();
			fileVO.setAtchFileId(atchFileId);
			fileVO.setFileSn(fileSn);
			FileVO fvo = fileService.selectFileInf(fileVO);

			File uFile = new File(fvo.getFileStreCours(), fvo.getStreFileNm());
			long fSize = uFile.length();

			if (fSize > 0) {
				String mimetype = "application/x-msdownload";

				//response.setBufferSize(fSize);	// OutOfMemeory 발생
				response.setContentType(mimetype);
				//response.setHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fvo.getOrignlFileNm(), "utf-8") + "\"");
				setDisposition(fvo.getOrignlFileNm(), request, response);
				//response.setContentLength(fSize);

				/*
				 * FileCopyUtils.copy(in, response.getOutputStream());
				 * in.close();
				 * response.getOutputStream().flush();
				 * response.getOutputStream().close();
				 */
				BufferedInputStream in = null;
				BufferedOutputStream out = null;

				try {
					in = new BufferedInputStream(new FileInputStream(uFile));
					out = new BufferedOutputStream(response.getOutputStream());

					FileCopyUtils.copy(in, out);
					out.flush();
				} catch (IOException ex) {
					// 다음 Exception 무시 처리
					// Connection reset by peer: socket write error
					EgovBasicLogger.ignore("IO Exception", ex);
				} finally {
					EgovResourceCloseHelper.close(in, out);
				}

			} else {
				response.setContentType("application/x-msdownload");

				PrintWriter printwriter = response.getWriter();
				
				printwriter.println("<html>");
				printwriter.println("<br><br><br><h2>Could not get file name:<br>" + fvo.getOrignlFileNm() + "</h2>");
				printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
				printwriter.println("<br><br><br>&copy; webAccess");
				printwriter.println("</html>");
				
				printwriter.flush();
				printwriter.close();
			}
		}
	}

	
	
	/**
	 * 일괄다운로드
	 *
	 * @param commandMap
	 * @param response
	 * @throws Exception
	 */

	/** ZIP_FROM_PATH : 압축대상경로 */
	//static String ZIP_FROM_PATH = "C:\\ctas\\down";
	
	@Resource(name = "CtasService")
    private CtasService CtasService;
	
	@RequestMapping(value = "/cmm/fms/FileDown2.do")
	public void cvplFileDownload2(@RequestParam Map<String, Object> commandMap, HttpServletRequest request, HttpServletResponse response) throws Exception {

		// 1. 조회된조건으로 SELECT
		String srchOrg = URLDecoder.decode( (String) commandMap.get("srchOrg") ,"UTF-8");
		String orgId   = URLDecoder.decode( (String) commandMap.get("orgId")   ,"UTF-8");
		Map hm = new HashMap();
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		hm.put("ORG", loginVO.getOrgnztId());
		hm.put("GRPID", loginVO.getGroupId());
		hm.put("SRCHORG", srchOrg);
		hm.put("ORGID", orgId);
		hm.put("USRID", loginVO.getId());
		List uploadList = CtasService.selectUploadList(hm);
		
		Calendar calendar = Calendar.getInstance();
        java.util.Date date = calendar.getTime();
        String today = (new SimpleDateFormat("yyyyMMddHHmmssSSS").format(date));

        // 2. 파일다운로드 로그 작성
        // 로그파일 생성
 		String logFilePath = "C:\\ctas\\fileDownLog.txt";
 		File fLog = new File(logFilePath);
        if (fLog.exists() == false)
        {
        	fLog.createNewFile();
        }
        // 로그파일 읽기 
        String strText = "";  
        int nBuffer; 
        BufferedReader buffRead = new BufferedReader(new FileReader(fLog));  
        while ((nBuffer = buffRead.read()) != -1)  
        {
            strText += (char)nBuffer;
        }
        buffRead.close();
        // 로그파일 쓰기
        BufferedWriter buffWrite = new BufferedWriter(new FileWriter(fLog));
        String Text = strText + "\r\n"
        			+ today + "\t"
        			+ loginVO.getIp()+ "\t"
        			+ loginVO.getId()+ "\t"
        			+ loginVO.getOrgnztNm()+ " : "
        			+ loginVO.getOrgnztId()+ "\t"
        			+ loginVO.getGroupId()+ "\t"
        			+ srchOrg+ "\t"
        			+ orgId;
        buffWrite.write(Text, 0, Text.length());
        // 로그파일 닫기
        buffWrite.flush();
        buffWrite.close();
        
		// 3. 조회된 리스트로 파일만들기
        String ZIP_FROM_PATH = "C:\\ctas\\"+today;
		File f = new File(ZIP_FROM_PATH);
		deleteDirectory(f);//초기화
		f.mkdir();
		String level1 = ""; //기관명[폴더]
		String level2 = ""; //지표명[폴더]
		String level3 = ""; //자료[파일]
		for(int i = 0 ; i < uploadList.size() ; i++){
			hm = (HashMap) uploadList.get(i);
			if(hm.get("ATCH_FILE_ID2") == null && hm.get("ATCH_FILE_ID") == null) continue;
			//1.기관명 폴더 생성
			if(!hm.get("ORGNZT_NM").toString().equals(level1)){
				level1 = hm.get("ORGNZT_NM").toString();
				level2 = "";
				level3 = "";
				f= new File(ZIP_FROM_PATH + "\\" + level1);
				f.mkdir();
			}
			//2.지표명 폴더 생성
			if(!hm.get("CODE_NM").toString().equals(level2)){
				level2 = hm.get("CODE_NM").toString();
				level3 = "";
				f= new File(ZIP_FROM_PATH + "\\" + level1 + "\\" + level2);
				f.mkdir();
			}
			//3.파일복사	upload경로의 파일을 down경로로 복사
			//3-1.자료파일
			if(hm.get("ATCH_FILE_ID2") != null){
				f= new File(hm.get("FILE_STRE_COURS2").toString()+"\\"+hm.get("STRE_FILE_NM2").toString());
				if(!hm.get("ATCH_FILE_ID2").toString().equals(level3) && f.exists()){
					level3 = hm.get("ATCH_FILE_ID2").toString();
					fileCopy(hm.get("FILE_STRE_COURS2").toString()+"\\"+hm.get("STRE_FILE_NM2").toString()
							, ZIP_FROM_PATH + "\\" + level1 + "\\" + level2+"\\(1. 자료) "+hm.get("ORIGNL_FILE_NM2").toString());
				}
			}
			//3-2.실적증빙파일
			if(hm.get("ATCH_FILE_ID") != null){
				f= new File(hm.get("FILE_STRE_COURS").toString()+"\\"+hm.get("STRE_FILE_NM").toString());
				if(f.exists()){
					fileCopy(hm.get("FILE_STRE_COURS").toString()+"\\"+hm.get("STRE_FILE_NM").toString()
							, ZIP_FROM_PATH + "\\" + level1 + "\\" + level2+"\\(2. 실적증빙_"+hm.get("FILE_SEQ_NO").toString()+") "+hm.get("ORIGNL_FILE_NM").toString());
				}
			}
		}
		
		// 4. zip파일생성
		createZipFile(ZIP_FROM_PATH,ZIP_FROM_PATH,"전체.zip");
		
		// 5. 다운 : FileDown.do 로직
		File uFile = new File(ZIP_FROM_PATH, "전체.zip");
		
		String mimetype = "application/x-msdownload";
		response.setContentType(mimetype);
		
		// 다운이름지정
		setDisposition("전체.zip", request, response);

		BufferedInputStream in = null;
		BufferedOutputStream out = null;
		try {
			in = new BufferedInputStream(new FileInputStream(uFile));
			out = new BufferedOutputStream(response.getOutputStream());

			FileCopyUtils.copy(in, out);
			out.flush();
		} catch (IOException ex) {
			// 다음 Exception 무시 처리
			// Connection reset by peer: socket write error
			EgovBasicLogger.ignore("IO Exception", ex);
		} finally {
			EgovResourceCloseHelper.close(in, out);
			deleteDirectory(new File(ZIP_FROM_PATH));
		}
	}
	
	 //파일을 복사하는 메소드
	public static void fileCopy(String inFileName, String outFileName) {
		try{
			FileInputStream inputStream = new FileInputStream(inFileName);         
			FileOutputStream outputStream = new FileOutputStream(outFileName);
		   
			FileChannel fcin =  inputStream.getChannel();
			FileChannel fcout = outputStream.getChannel();
		   
			long size = fcin.size();
			fcin.transferTo(0, size, fcout);
		   
			fcout.close();
			fcin.close();
		   
			outputStream.close();
			inputStream.close();
		}catch (IOException e) {
			e.printStackTrace();
		}
	}
             
	 //폴더삭제 : 재귀삭제 	출처: http://moonlighting.tistory.com/129 [주경야근]
	 public static boolean deleteDirectory(File path) { 
		 if(!path.exists()) { 
			 return false; 
		} 
		 File[] files = path.listFiles(); 
		 for (File file : files) { 
			 if (file.isDirectory()) { 
				 deleteDirectory(file); 
			} else { 
				file.delete(); 
			} 
		} 
		 return path.delete(); 
	}

	
	/**
     * 디렉토리 및 파일을 압축한다.
     * @param path 압축할 디렉토리 및 파일
     * @param toPath 압축파일을 생성할 경로
     * @param fileName 압축파일의 이름
     */
    public static void createZipFile(String path, String toPath, String fileName) {
 
        File dir = new File(path);
        String[] list = dir.list();
        String _path;
 
        if (!dir.canRead() || !dir.canWrite())
            return;
 
        int len = list.length;
 
        if (path.charAt(path.length() - 1) != '/')
            _path = path + "/";
        else
            _path = path;
 
        try {
            ZipOutputStream zip_out = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(toPath+"/"+fileName), 2048));
 
            for (int i = 0; i < len; i++)
                zip_folder("",new File(_path + list[i]), zip_out, path);
 
            zip_out.close();
 
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (IOException e) {
        	System.out.println(e.getMessage());
        } finally {
 
 
        }
    }
 
    /**
     * ZipOutputStream를 넘겨 받아서 하나의 압축파일로 만든다.
     * @param parent 상위폴더명
     * @param file 압축할 파일
     * @param zout 압축전체스트림
     * @throws IOException
     */
    private static void zip_folder(String parent, File file, ZipOutputStream zout, String ZIP_FROM_PATH) throws IOException {
        byte[] data = new byte[2048];
        int read;
 
        if (file.isFile()) {
            ZipEntry entry = new ZipEntry(parent + file.getName());
            zout.putNextEntry(entry);
            BufferedInputStream instream = new BufferedInputStream(new FileInputStream(file));
 
            while ((read = instream.read(data, 0, 2048)) != -1)
                zout.write(data, 0, read);
 
            zout.flush();
            zout.closeEntry();
            instream.close();
 
        } else if (file.isDirectory()) {
            String parentString = file.getPath().replace(ZIP_FROM_PATH,"");
            parentString = parentString.substring(0,parentString.length() - file.getName().length());
            ZipEntry entry = new ZipEntry(parentString+file.getName()+"/");
            zout.putNextEntry(entry);
 
            String[] list = file.list();
            if (list != null) {
                int len = list.length;
                for (int i = 0; i < len; i++) {
                    zip_folder(entry.getName(),new File(file.getPath() + "/" + list[i]), zout, ZIP_FROM_PATH);
                }
            }
        }
    }

}
