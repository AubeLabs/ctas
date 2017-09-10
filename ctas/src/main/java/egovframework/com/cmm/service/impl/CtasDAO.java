package egovframework.com.cmm.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.FileVO;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.com.cop.bbs.service.Board;
import egovframework.com.cop.bbs.service.BoardMasterVO;
import egovframework.com.cop.bbs.service.BoardVO;

@Repository("CtasDAO")
public class CtasDAO extends EgovComAbstractDAO {

	public List selectUploadList(Map map) {
		return list("CtasUpload.selectUploadList", map);
	}
	public HashMap selectUploadGrp(Map map) {
		return (HashMap) list("CtasUpload.selectUploadGrp", map).get(0);
	}
	
	public List selectStatsList(Map map) {
		return list("CtasUpload.selectStatsList", map);
	}
	public HashMap selectStatsGrp(Map map) {
		return (HashMap) list("CtasUpload.selectStatsGrp", map).get(0);
	}
	
	public void insertUploadFile0(Map map) {
		insert("CtasUpload.insertUploadFile0", map);
	}

	public void insertUploadFile1(Map map) {
		insert("CtasUpload.insertUploadFile1", map);
	}
	
	public void deleteUploadFile(FileVO vo) {
		delete("CtasUpload.deleteUploadFile", vo);
	}
	public void deleteUploadFile2(FileVO vo) {
		delete("CtasUpload.deleteUploadFile2", vo);
	}
	
	public void insertRate(Map map) {
		insert("CtasUpload.insertRate", map);
	}
	
	public void insertMber(Map map) {
		insert("CtasUpload.insertMber", map);
	}
	
	public List selectOrgList(Map map) {
		return list("CtasUpload.selectOrgList", map);
	}
	
	public HashMap selectAllStatus() {
		return (HashMap)selectOne("CtasUpload.selectAllStatus");
	}
	
	public List selectChkList(Map map) {
		return list("CtasUpload.selectChkList", map);
	}
}
