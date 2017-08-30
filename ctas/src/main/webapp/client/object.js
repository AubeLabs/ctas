if (browserType == BROWSER_IE)
	document.write('<OBJECT ID="GPKISecureWebX" CLASSID="'+CLASSID+'" WIDTH = 0 HEIGHT = 0></OBJECT>');
else
	document.write('<embed id="GPKISecureWebX" type="application/mozilla-npGPKISecureWebPlugin-scriptable-plugin" WIDTH = 0 HEIGHT = 0>');
var GPKISecureWeb = document.getElementById('GPKISecureWebX');
