package egovframework.com.cmm.web;

/**
 * 컴포넌트 설치 후 설치된 컴포넌트들을 IncludedInfo annotation을 통해 찾아낸 후
 * 화면에 표시할 정보를 처리하는 Controller 클래스
 * <Notice>
 * 		개발시 메뉴 구조가 잡히기 전에 배포파일들에 포함된 공통 컴포넌트들의 목록성 화면에
 * 		URL을 제공하여 개발자가 편하게 활용하도록 하기 위해 작성된 것으로,
 * 		실제 운영되는 시스템에서는 적용해서는 안 됨
 *      실 운영 시에는 삭제해서 배포해도 좋음
 * <Disclaimer>
 * 		운영시에 본 컨트롤을 사용하여 메뉴를 구성하는 경우 성능 문제를 일으키거나
 * 		사용자별 메뉴 구성에 오류를 발생할 수 있음
 * @author 공통컴포넌트 정진오
 * @since 2011.08.26
 * @version 2.0.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일		수정자		수정내용
 *  -------    	--------    ---------------------------
 *  2011.08.26	정진오 		최초 생성
 *  2011.09.16  서준식		컨텐츠 페이지 생성
 *  2011.09.26  이기하		header, footer 페이지 생성
 * </pre>
 */

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.annotation.Resource;

import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.cmm.IncludedCompInfoVO;
import egovframework.com.cmm.LoginVO;
import egovframework.com.cmm.annotation.IncludedInfo;
import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.util.EgovUserDetailsHelper;
import egovframework.com.cop.bbs.service.BoardMaster;
import egovframework.com.cop.bbs.service.BoardMasterVO;
import egovframework.com.cop.bbs.service.BoardVO;
import egovframework.com.sec.drm.service.DeptAuthorVO;
import egovframework.com.sec.drm.service.EgovDeptAuthorService;
import egovframework.com.uat.uia.service.impl.LoginDAO;
import egovframework.com.uss.umt.service.MberManageVO;
import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springmodules.validation.commons.DefaultBeanValidator;

import egovframework.com.cmm.service.CtasService;
import egovframework.com.cmm.service.CtasVO;

@Controller
public class EgovComIndexController implements ApplicationContextAware, InitializingBean {

	@Resource(name="loginDAO")
    private LoginDAO loginDAO;
	
	@Resource(name = "CtasService")
    private CtasService CtasService;
	
    @Resource(name = "EgovFileMngService")
    private EgovFileMngService fileMngService;
    
    @Resource(name = "EgovFileMngUtil")
    private EgovFileMngUtil fileUtil;
    
    @Resource(name = "egovDeptAuthorService")
    private EgovDeptAuthorService egovDeptAuthorService;
    
    @Resource(name="egovMessageSource")
    EgovMessageSource egovMessageSource;
    
    @Autowired
    private DefaultBeanValidator beanValidator;
    
	private ApplicationContext applicationContext;

	private static final Logger LOGGER = LoggerFactory.getLogger(EgovComIndexController.class);

	private Map<Integer, IncludedCompInfoVO> map;

	public void afterPropertiesSet() throws Exception {}

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
		
		LOGGER.info("EgovComIndexController setApplicationContext method has called!");
	}

	@RequestMapping("/index.do")
	public String index(ModelMap model) {
		return "egovframework/com/cmm/EgovUnitMain";
	}

	@RequestMapping("/EgovTop.do")
	public String top() {
		return "egovframework/com/cmm/EgovUnitTop";
	}

	@RequestMapping("/EgovBottom.do")
	public String bottom() {
		return "egovframework/com/cmm/EgovUnitBottom";
	}

	@RequestMapping("/EgovContent.do")
	public String setContent( ModelMap model) {

		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		model.addAttribute("loginVO", loginVO);

		return "egovframework/com/cmm/EgovUnitContent";
	}

	@RequestMapping("/MberInsert.do")
	public String MberInsert(@ModelAttribute("ctasVO") CtasVO ctasVO, ModelMap model) {
		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		model.addAttribute("loginVO", loginVO);
		System.out.println("certDn : "+ctasVO.getCertDn());
		
		
		if(ctasVO.getCertDn().equals("")){//메뉴접근시
			//
			
		}else {//등록시
			try{
				LoginVO srch = new LoginVO();
				srch.setDn(ctasVO.getCertDn());
				LoginVO valid = loginDAO.actionLogin(srch);
				System.out.println("@@@@@@ : "+valid);
				if(valid != null){
					model.addAttribute("msg", "해당 인증서는 이미 등록되어있습니다.");
					model.addAttribute("sucess", -1);
				}else {
					Map hm = new HashMap();
					hm.put("nm", ctasVO.getNm());
					hm.put("orgId", ctasVO.getOrgId());
					hm.put("certDn", ctasVO.getCertDn());
					CtasService.insertMber(hm);
					model.addAttribute("msg", "등록이 완료되었습니다.");
					model.addAttribute("sucess", 1);
				}
			}catch(Exception e){
				model.addAttribute("msg", "등록중 에러가발생했습니다.");
				model.addAttribute("sucess", -1);
			}
		}
		model.addAttribute("ctasVO", ctasVO);

		return "egovframework/com/cmm/MberInsert";
	}
	
	@RequestMapping("/UpLoad.do")
	public String upLoadMenu(@ModelAttribute("ctasVO") CtasVO ctasVO, ModelMap model) {

		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		Map hm = new HashMap();
		hm.put("ORG", loginVO.getOrgnztId());
		hm.put("GRPID", loginVO.getGroupId());
		hm.put("SRCHORG", ctasVO.getSrchOrg());
		List uploadList = CtasService.selectUploadList(hm);
		HashMap uploadGrp = CtasService.selectUploadGrp(hm);
		
		//
		if(ctasVO.getSrchOrg().equals("init"))ctasVO.setSrchOrg("");
		model.addAttribute("loginVO", loginVO);
		model.addAttribute("ctasVO", ctasVO);
		model.addAttribute("uploadList", uploadList);
		model.addAttribute("GUBUN", loginVO.getGroupId().equals("GROUP_00000000000001")?"A":"B");
		model.addAttribute("uploadGrp", uploadGrp);
		
		return "egovframework/com/cmm/UpLoad";
	}
	
	@RequestMapping("/Stats.do")
	public String Stats(@ModelAttribute("ctasVO") CtasVO ctasVO, ModelMap model) {

		LoginVO loginVO = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		
		Map hm = new HashMap();
		hm.put("items1", ctasVO.getItems1());
		hm.put("items2", ctasVO.getItems2());
		List statsList = CtasService.selectStatsList(hm);
		HashMap statsGrp = CtasService.selectStatsGrp(hm);
		
		//
		if(ctasVO.getSrchOrg().equals("init"))ctasVO.setSrchOrg("");
		model.addAttribute("loginVO", loginVO);
		model.addAttribute("ctasVO", ctasVO);
		model.addAttribute("statsList", statsList);
		model.addAttribute("statsGrp", statsGrp);
		
		return "egovframework/com/cmm/Stats";
	}
	
    /**
     * 게시물을 등록한다.
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/insertUpLoad.do")
    public String insertUpLoad(final MultipartHttpServletRequest multiRequest
    		, @ModelAttribute("ctasVO") CtasVO vo,
	    ModelMap model) throws Exception {

    	//System.out.println(vo);
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

	    List<FileVO> result = null;
	    String atchFileId = "";
	    
	    final Map<String, MultipartFile> files = multiRequest.getFileMap();
	    if (!files.isEmpty()) {
	    	result = fileUtil.parseFileInf(files, "BBS_", 0, "", "");
	    	atchFileId = fileMngService.insertFileInfs(result);
	    }
	    
	    Map hm = new HashMap();
	    hm.put("ORGNZT_ID", user.getOrgnztId());//조직코드
	    hm.put("AI_CD", vo.getCtacd().substring(1, 2));//평가지표코드
	    //hm.put("C", user.getOrgnztId()); //일련번호 쿼리에서
	    hm.put("FILE_ID", atchFileId);//파일ID
		hm.put("USER_ID", user.getId());//등록자
		
	    if (vo.getCtacd().substring(0, 1).equals("0")){ //보고서
	    	CtasService.insertUploadFile0(hm);
	    }else{ //실적증빙
	    	CtasService.insertUploadFile1(hm);
	    }
	    
		return "forward:/UpLoad.do";
    }
    
    /**
     * 점수등록
     * 
     * @param boardVO
     * @param board
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping("/goRate.do")
    public String goRate(final MultipartHttpServletRequest multiRequest
    		, @ModelAttribute("ctasVO") CtasVO vo,
	    ModelMap model) throws Exception {

    	//System.out.println(vo);
		LoginVO user = (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser();

	    CtasService.insertRate(vo.getRate());

		return "forward:/UpLoad.do";
    }
    
	/**
	 * 기관목록 조회
	 * @param deptAuthorVO DeptAuthorVO
	 * @return String
	 * @exception Exception
	 */
    @RequestMapping(value="/OrgSearchList.do")
	public String selectDeptList(@ModelAttribute("deptAuthorVO") DeptAuthorVO deptAuthorVO,
			                             ModelMap model) throws Exception {

    	/** paging */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(deptAuthorVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(deptAuthorVO.getPageUnit());
		paginationInfo.setPageSize(deptAuthorVO.getPageSize());
		
		deptAuthorVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		deptAuthorVO.setLastIndex(paginationInfo.getLastRecordIndex());
		deptAuthorVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
		deptAuthorVO.setDeptList(egovDeptAuthorService.selectDeptList(deptAuthorVO));
        model.addAttribute("deptList", deptAuthorVO.getDeptList());
        
        int totCnt = egovDeptAuthorService.selectDeptListTotCnt(deptAuthorVO);
		paginationInfo.setTotalRecordCount(totCnt);
        model.addAttribute("paginationInfo", paginationInfo);
       
        model.addAttribute("message", egovMessageSource.getMessage("success.common.select"));
        
        model.addAttribute("GUBUN", deptAuthorVO.getGUBUN());
        return "egovframework/com/cmm/EgovOrgSearch";
	}
    
    @RequestMapping(value="/CaiSearchList.do")
	public String CaiSearchList(ModelMap model) throws Exception {
    	
        return "egovframework/com/cmm/EgovCaiSearch";
	}
    
	@RequestMapping("/EgovLeft.do")
	public String setLeftMenu(ModelMap model) {

		/* 최초 한 번만 실행하여 map에 저장해 놓는다. */
		if (map == null) {
			map = new TreeMap<Integer, IncludedCompInfoVO>();
			RequestMapping rmAnnotation;
			IncludedInfo annotation;
			IncludedCompInfoVO zooVO;

			/*
			 * EgovLoginController가 AOP Proxy되는 바람에 클래스를 reflection으로 가져올 수 없음
			 */
			try {
				Class<?> loginController = Class.forName("egovframework.com.uat.uia.web.EgovLoginController");
				Method[] methods = loginController.getMethods();
				for (int i = 0; i < methods.length; i++) {
					annotation = methods[i].getAnnotation(IncludedInfo.class);

					if (annotation != null) {
						LOGGER.debug("Found @IncludedInfo Method : {}", methods[i]);
						zooVO = new IncludedCompInfoVO();
						zooVO.setName(annotation.name());
						zooVO.setOrder(annotation.order());
						zooVO.setGid(annotation.gid());

						rmAnnotation = methods[i].getAnnotation(RequestMapping.class);
						if ("".equals(annotation.listUrl()) && rmAnnotation != null) {
							zooVO.setListUrl(rmAnnotation.value()[0]);
						} else {
							zooVO.setListUrl(annotation.listUrl());
						}
						map.put(zooVO.getOrder(), zooVO);
					}
				}
			} catch (ClassNotFoundException e) {
				LOGGER.error("No egovframework.com.uat.uia.web.EgovLoginController!!");
			}
			/* 여기까지 AOP Proxy로 인한 코드 */

			/*@Controller Annotation 처리된 클래스를 모두 찾는다.*/
			Map<String, Object> myZoos = applicationContext.getBeansWithAnnotation(Controller.class);
			LOGGER.debug("How many Controllers : ", myZoos.size());
			for (final Object myZoo : myZoos.values()) {
				Class<? extends Object> zooClass = myZoo.getClass();

				Method[] methods = zooClass.getMethods();
				LOGGER.debug("Controller Detected {}", zooClass);
				for (int i = 0; i < methods.length; i++) {
					annotation = methods[i].getAnnotation(IncludedInfo.class);

					if (annotation != null) {
						//LOG.debug("Found @IncludedInfo Method : " + methods[i] );
						zooVO = new IncludedCompInfoVO();
						zooVO.setName(annotation.name());
						zooVO.setOrder(annotation.order());
						zooVO.setGid(annotation.gid());
						/*
						 * 목록형 조회를 위한 url 매핑은 @IncludedInfo나 @RequestMapping에서 가져온다
						 */
						rmAnnotation = methods[i].getAnnotation(RequestMapping.class);
						if ("".equals(annotation.listUrl())) {
							zooVO.setListUrl(rmAnnotation.value()[0]);
						} else {
							zooVO.setListUrl(annotation.listUrl());
						}

						map.put(zooVO.getOrder(), zooVO);
					}
				}
			}
		}

		model.addAttribute("resultList", map.values());
		
		LOGGER.debug("EgovComIndexController index is called ");

		return "egovframework/com/cmm/EgovUnitLeft";
	}
}
