package egovframework.com.cmm.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import egovframework.com.cmm.service.FileVO;
import egovframework.rte.fdl.cmmn.exception.FdlException;

public interface CtasService {

/*	Map<String, Object> selectArticleList(BoardVO boardVO);

	BoardVO selectArticleDetail(BoardVO boardVO);

	void insertArticle(Board board) throws FdlException;

	void updateArticle(Board board);

	void deleteArticle(Board board) throws Exception;

	List<BoardVO> selectNoticeArticleList(BoardVO boardVO);

	Map<String, Object> selectGuestArticleList(BoardVO vo);*/

	List selectUploadList(Map map);
	HashMap selectUploadGrp(Map map);
	List selectStatsList(Map map);
	HashMap selectStatsGrp(Map map);
	void insertUploadFile0(Map map);
	void insertUploadFile1(Map map);
	void deleteUploadFile(FileVO vo) throws Exception;
	void insertRate(String str);
	void insertMber(Map map);
}
