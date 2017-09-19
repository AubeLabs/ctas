/**
 * 
 */
var broswer = {};
 
broswer.isMobile = function() {
    var tempUser = navigator.userAgent;
    var isMobile = false;
 
    // userAgent 값에 iPhone, iPad, ipot, Android 라는 문자열이 하나라도 존재한다면 모바일로 간주됨.
    if (tempUser.indexOf("iPhone") > 0 || tempUser.indexOf("iPad") > 0
            || tempUser.indexOf("iPot") > 0 || tempUser.indexOf("Android") > 0) {
        isMobile = true;
    }
    return isMobile;
};

broswer.isMobileChkPrint = function(isMobileChk) {
    var result = "";
    if (isMobileChk) {
        result = "모바일 웹 브라우저로 접속했습니다.";
    } else {
        result = "PC용 웹 브라우저로 접속했습니다.";
    }
    return result;
};

//브라우저의 종류 확인
broswer.getBroswerName = function() {
    //userAgent값을 모두 소문자로 변환하여 변수에 대입
    var agt = navigator.userAgent.toLowerCase();
    
    if(agt.indexOf("chrome") != -1) {
        return 'Chrome';
    }
    else if(agt.indexOf("opera") != -1) {
        return 'Opera';
    }
    else if(agt.indexOf("firefox") != -1) {
        return 'Firefox';
    }
    else if(agt.indexOf("safari") != -1) {
        return 'Safari';
    }
    else if(agt.indexOf("skipstone") != -1) {
        return 'Skipstone';
    }
    //msie는 Expolrer 11d이전 버전, trident는 Explorer 11버전
    else if(agt.indexOf("msie") != -1 || agt.indexOf("trident") != -1) {
        return 'Internet Explorer';
    }
    else if(agt.indexOf("netscape") != -1) {
        return 'Netscape';
    }
    else {
        return 'Unknown';
    }
};
