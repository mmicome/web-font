//脚本注入
(function () {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL("./hook.js");
    (document.head || document.documentElement).appendChild(s);
})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    // if(request.cmd == 'test') alert(request.value);
    // sendResponse('我收到了你的消息！');
    tools[request.action](request.data);
});
