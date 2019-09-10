var tools = {
    refer: function(data) {
        window.open(data, "_blank");
    },
    daka: function(data) {
        document.querySelectorAll(".dk").forEach(function (item) {
            item.style.display = 'block';
            var res = item.lastChild.nodeValue.match(/(\d\d):(\d\d)/);
            if (res && (parseInt(res[1]) == 20 && parseInt(res[2]) > 30 || parseInt(res[1]) > 20)) {
                item.style.color = "red";
            }
        });
    },
    pachun: function(data) {
        
    },
    note: function(data) {
        alert(123);
    },
    debug: function() {
        console.log("debug");
    },
    exportBK: function(tabs) {
        // 获取所有的 tabs
        // chrome.tabs.query({}, function (tabs) {
        //     tabs.forEach(function (tab) {
        //         connsole.log(tab.url);
        //         chrome.tabs.duplicate(tab.id, function (copy) {
        //           console.log(copy.title);  // copy 是复制出来的 tab
        //         });
        //     });
        // });
        for(var i in tabs) {
            console.log(tabs[i].url);
        }
    }
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'test') alert(request.value);
    sendResponse('我收到了你的消息！');
    tools[request.action](request.data);
});

//脚本注入
(function () {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL("assets/js/hook.js");
    (document.head || document.documentElement).appendChild(s);
})();
