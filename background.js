// 获取实际访问的IP放入缓存
chrome.webRequest.onCompleted.addListener(function (details) {
    chrome.tabs.executeScript(details.tabId, {
        code: '(function(ip){\
          if(ip){\
            ip.innerHTML="' + details.ip + '";\
          }else{\
            ip=document.createElement("div");\
            ip.innerHTML="' + details.ip + '";\
            ip.id="show-ip-666";\
            ip.title="Click to hide me";\
            document.body.appendChild(ip);\
            ip.addEventListener("click",function(){\
              \ip.parentNode.removeChild(ip);\
            });\
          }\
        })(document.getElementById("show-ip-666"))'
    });
    chrome.tabs.insertCSS(details.tabId, {
        file: 'inject.css'
    });
}, {
    urls: ['http://*/*', 'https://*/*'],
    types: ['main_frame']
});