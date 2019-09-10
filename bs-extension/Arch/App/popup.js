var appColor = ["#ff80c0", "#80ffff", "#80ff80", "#ff0", "#ff8000"]
var app = document.getElementsByTagName("app");

function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if(callback) callback(response);
        });
    });
}

//关于状态需要本地化

for (var i = 0; i < app.length; i++) {
    var app_header = app[i].getElementsByTagName("header")[0];
    app_header.onclick = function () {
        var action = this.getAttribute("data-action");
        var url = this.getAttribute("data-url");
        // var bg = chrome.extension.getBackgroundPage();
        // bg.tools[action](url);
        sendMessageToContentScript({action: action, data: url});
    }
}

var sign = document.getElementsByTagName("sign");
for (var i = 0; i < sign.length; i++) {
    sign[i].onclick = function () {
        if (this.classList.contains("close")) {
            this.classList.remove("close");
            this.style.background = "#74d8f1";
        }
        else {
            this.classList.add("close");
            this.style.background = "#ccc";
        }
    }
    if(!sign[i].classList.contains("close")) {
        var header = sign[i].parentNode.getElementsByTagName("header")[0];
        var action = header.getAttribute("data-action");
        var url = header.getAttribute("data-url");
        sendMessageToContentScript({action: action, data: url});
    }
}

//设置图标状态
chrome.browserAction.setBadgeText({ text: '2019' });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

