package egovframework.com.cmm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.service.CtasService;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

@Service("CtasService")
public class CtasServiceImpl extends EgovAbstractServiceImpl implements CtasService {
	
	@Resource(name = "CtasDAO")
    private CtasDAO CtasDAO;
	
	@Resource(name = "EgovFileMngService")
    private EgovFileMngService fileService;
	
	@Override
	public List selectUploadList(Map map) {
		return CtasDAO.selectUploadList(map);
	}
	@Override
	public HashMap selectUploadGrp(Map map) {
		return CtasDAO.selectUploadGrp(map);
	}
	
	@Override
	public List selectStatsList(Map map) {
		return CtasDAO.selectStatsList(map);
	}
	@Override
	public HashMap selectStatsGrp(Map map) {
		return CtasDAO.selectStatsGrp(map);
	}
	
	@Override
	public void insertUploadFile0(Map map) {
		CtasDAO.insertUploadFile0(map);
	}
	
	@Override
	public void insertUploadFile1(Map map) {
		CtasDAO.insertUploadFile1(map);
	}
	
	@Override
	public void deleteUploadFile(FileVO vo) throws Exception {
		//파일마스터삭제
        fileService.deleteAllFileInf(vo);
        //파일상세삭제
        fileService.deleteFileInf(vo);
        //ctas파일삭제
		CtasDAO.deleteUploadFile(vo);
		CtasDAO.deleteUploadFile2(vo);
	}
	
	@Override
	public void insertRate(String str) {
		
		HashMap hm = new HashMap();
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();
		hm.put("USER_ID", user.getId());//등록자
		
		String[] arrRow, arrCol, arrVal;
		arrRow = str.split("；");
		for(int i = 0 ; i < arrRow.length; i++){
			arrCol = arrRow[i].split("，");
			for(int j = 0 ; j < arrCol.length; j++){
				arrVal = arrCol[j].split("：");
				hm.put(arrVal[0], arrVal.length==1?null:arrVal[1]);
			}
			System.out.println("ASSESSMENT INPUT -> "+hm);
			CtasDAO.insertRate(hm);
		}
		
	}

	@Override
	public void insertMber(Map map) {
		CtasDAO.insertMber(map);
	}
	@Override
	public List selectOrgList(Map map) {
		return CtasDAO.selectOrgList(map);
	}
	
	@Override
	public HashMap selectAllStatus() {
		return CtasDAO.selectAllStatus();
	}
}
