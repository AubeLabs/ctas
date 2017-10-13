package egovframework.com.cmm.service;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

import egovframework.com.cop.bbs.service.Board;

/**
 * 게시물 관리를 위한 VO 클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일      수정자           수정내용
 *  -------      --------    ---------------------------
 *   2009.3.19  이삼섭          최초 생성
 *   2009.06.29  한성곤		2단계 기능 추가 (댓글관리, 만족도조사)
 *
 * </pre>
 */
@SuppressWarnings("serial")
public class CtasVO implements Serializable {

  /**
   * toString 메소드를 대치한다.
   */
  public String toString() {
	return ToStringBuilder.reflectionToString(this);
  }
  
  //upload 화면에서사용
  private String ctacd = "";
  private String srchOrg = "init";
  private String rate = "";
  //인증서등록에서사용
  private String nm = "";
  private String orgNm = "";
  private String orgId = "";
  private String certDn = "";
  //통계화면에서사용
  private String items1 = "";
  private String items2 = "";
  private String select1 = "";
  private String select2 = "";
  //기관조회에서 사용
  private String searchKeyword = "";
  private String GUBUN = "";
  private String ordCol = "";
  private String ordTyp = "";
  private String chkChg = "";
  private String upYn = "";
  //사용안함
  private String gubun1= "";
  private String gubun2= "";
  private String test= "";



  
public String getUpYn() {
	return upYn;
}


public void setUpYn(String upYn) {
	this.upYn = upYn;
}


public String getChkChg() {
	return chkChg;
}


public void setChkChg(String chkChg) {
	this.chkChg = chkChg;
}


public String getOrdCol() {
	return ordCol;
}


public void setOrdCol(String ordCol) {
	this.ordCol = ordCol;
}


public String getOrdTyp() {
	return ordTyp;
}


public void setOrdTyp(String ordTyp) {
	this.ordTyp = ordTyp;
}


public String getGUBUN() {
	return GUBUN;
}


public void setGUBUN(String gUBUN) {
	GUBUN = gUBUN;
}


public String getSearchKeyword() {
	return searchKeyword;
}


public void setSearchKeyword(String searchKeyword) {
	this.searchKeyword = searchKeyword;
}


public String getItems1() {
	return items1;
}


public void setItems1(String items1) {
	this.items1 = items1;
}


public String getItems2() {
	return items2;
}


public void setItems2(String items2) {
	this.items2 = items2;
}


public String getSelect1() {
	return select1;
}


public void setSelect1(String select1) {
	this.select1 = select1;
}


public String getSelect2() {
	return select2;
}


public void setSelect2(String select2) {
	this.select2 = select2;
}


	public String getOrgNm() {
		return orgNm;
	}
	
	
	public void setOrgNm(String orgNm) {
		this.orgNm = orgNm;
	}


	public String getNm() {
		return nm;
	}
	
	
	public void setNm(String nm) {
		this.nm = nm;
	}
	
	
	public String getOrgId() {
		return orgId;
	}
	
	
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	
	
	public String getCertDn() {
		return certDn;
	}
	
	
	public void setCertDn(String certDn) {
		this.certDn = certDn;
	}
	
	
	public String getRate() {
		return rate;
	}
	
	
	public void setRate(String rate) {
		this.rate = rate;
	}
	
	
	public String getSrchOrg() {
		return srchOrg;
	}
	
	
	public void setSrchOrg(String srchOrg) {
		this.srchOrg = srchOrg;
	}
	
	
	public String getCtacd() {
		return ctacd;
	}
	
	
	public void setCtacd(String ctacd) {
		this.ctacd = ctacd;
	}
	
	  public String getGubun1() {
		return gubun1;
	}
	
	  
	public void setGubun1(String gubun1) {
		this.gubun1 = gubun1;
	}
	
	public String getGubun2() {
		return gubun2;
	}
	
	public void setGubun2(String gubun2) {
		this.gubun2 = gubun2;
	}
	
	public String getTest() {
		return test;
	}
	
	public void setTest(String test) {
		this.test = test;
	}

}
