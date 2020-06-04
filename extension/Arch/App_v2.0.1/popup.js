function sendMessageToContentScript(message, callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        chrome.tabs.sendMessage(tabs[0].id, message, function(response)
        {
            if (chrome.runtime.lastError) {
                // If I click learningPointButton, the line will excute, and log 'ERROR:  {message: "Could not establish connection. Receiving end does not exist."}' 
                console.log('ERROR: ', chrome.runtime.lastError);
            } else {
                console.log('The Content Script got the following Message: ' + JSON.stringify(response));
                if(callback) callback(response);
            }
        });
    });
}

var getTabs = function() {
    chrome.tabs.query({currentWindow: true}, function (tabs) {
        tabs.forEach(function (tab) {
            console.log(tab.url);
            //复制标签页
            // chrome.tabs.duplicate(tab.id, function (copy) {
            //   console.log(copy.title);  // copy 是复制出来的 tab
            // });
        });
        return tabs;
    });
};

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
                var span = document.createElement('span');
                var sectionApp = document.createElement("section");
                sectionApp. style.display = 'none';
                span.setAttribute('class', 'icon icon-circle-up');
                span.onclick = function() {
                    if(this.classList.contains('icon-circle-down')) {
                        this.setAttribute('class', 'icon icon-circle-up');
                        this.parentNode.querySelector('section'). style.display = 'none';
                    } else {
                        this.setAttribute('class', 'icon icon-circle-down');
                        this.parentNode.querySelector('section').style.display = 'block';
                    }
                }
                for(var i of obj.app) {
                    var app = document.createElement("app-tmp");
                    app.setAttribute("title", i.title);
                    app.setAttribute("action", i.action);
                    app.setAttribute("url", i.url);
                    app.setAttribute("content", i.content);
                    app.setAttribute("sign", i.sign);
                    sectionApp.appendChild(app);
                }
                section.appendChild(span);
                section.appendChild(header);
                section.appendChild(sectionApp);
                document.body.appendChild(section);
            }
        }
    }
};

xhr.send();

//关于状态需要本地化


//设置图标状态
//chrome.browserAction.setBadgeText({ text: '2019' });
//chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
