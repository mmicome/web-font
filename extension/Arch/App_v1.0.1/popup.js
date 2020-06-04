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

var url = "data/app.json";
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.onreadystatechange = function() {
    if(xhr.readyState === xhr.DONE) {
        var status = xhr.status;
        if(status >= 200 && status < 300 || status === 304 || status === 0) {
            var response = JSON.parse(xhr.response || xhr.responseText);
            for(var obj of response) {
                var section = document.createElement("section");
                var header = document.createElement("header");
                header.textContent = obj.title;
                section.appendChild(header);
                for(var i of obj.app) {
                    var app = document.createElement("app");
                    app.setAttribute("title", i.title);
                    app.setAttribute("action", i.action);
                    app.setAttribute("url", i.url);
                    app.setAttribute("content", i.content);
                    app.setAttribute("sign", i.sign);
                    section.appendChild(app);
                }
                document.body.appendChild(section)
            }
        }
    }
};

xhr.send();

//关于状态需要本地化


//设置图标状态
chrome.browserAction.setBadgeText({ text: '2019' });
chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
