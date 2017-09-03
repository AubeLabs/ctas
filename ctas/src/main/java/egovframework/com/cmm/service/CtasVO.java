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
  private String ctacd = "";
  
  private String srchOrg = "init";
  
  private String rate = "";
  
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
private String gubun1= "";
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
private String gubun2= "";
  private String test= "";
    
}
