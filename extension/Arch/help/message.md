# 文件通信

- header-col: 当前js
- header-row: 需要访问的js

<table>
    <tr>
        <td></td>
        <td> injected-script</td>
        <td>content-script</td>
        <td>popup-js</td>
        <td>background-js</td>
    </tr>
    <tr>
        <td>injected-script</td>
        <td>-</td>
        <td>window.postMessage</td>
        <td>-</td>
        <td>-</td>
    </tr>
    <tr>
        <td>content-script</td>
        <td> window.postMessage</td>
        <td>-</td>
        <td>chrome.runtime.sendMessage chrome.runtime.connect</td>
        <td>chrome.runtime.sendMessage chrome.runtime.connect</td>
    </tr>
    <tr>
        <td>popup-js</td>
        <td>-</td>
        <td>chrome.tabs.sendMessage chrome.tabs.connect</td>
        <td>-</td>
        <td>chrome.extension. getBackgroundPage()</td>
    </tr>
    <tr>
        <td>background-js</td>
        <td>-</td>
        <td>chrome.tabs.sendMessage chrome.tabs.connect</td>
        <td>chrome.extension.getViews</td>
        <td>-</td>
    </tr>
    <tr>
        <td>devtools-js</td>
        <td>chrome.devtools. inspectedWindow.eval</td>
        <td>-</td>
        <td> chrome.runtime.sendMessage</td>
        <td>chrome.runtime.sendMessage</td>
    </tr>
</table>

## 通信详解

>  popup和background

- popup可以直接调用background中的JS方法，也可以直接访问background的DOM：

```js
// background.js
function test()
{
    alert('我是background！');
}

// popup.js
var bg = chrome.extension.getBackgroundPage();
bg.test(); // 访问bg的函数
alert(bg.document.body.innerHTML); // 访问bg的DOM
```

- background访问popup如下（前提是popup已经打开）：

```js
var views = chrome.extension.getViews({type:'popup'});
if(views.length > 0) {
    console.log(views[0].location.href);
}
```
> popup或者bg向content主动发送消息

```js
//background.js或者popup.js：
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
sendMessageToContentScript({cmd:'test', value:'你好，我是popup！'}, function(response)
{
    console.log('来自content的回复：'+response);
});

//content-script.js接收：

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'test') alert(request.value);
    sendResponse('我收到了你的消息！');
});
//双方通信直接发送的都是JSON对象，不是JSON字符串，所以无需解析
//网上有些老代码中用的是chrome.extension.onMessage，没有完全查清二者的区别(貌似是别名)，但是建议统一使用chrome.runtime.onMessage。
```

>  content-script主动发消息给后台

```js
//content-script.js：

chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
    console.log('收到来自后台的回复：' + response);
});

//background.js 或者 popup.js：
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});
//content_scripts向popup主动发消息的前提是popup必须打开！否则需要利用background作中转；
//如果background和popup同时监听，那么它们都可以同时收到消息，但是只有一个可以sendResponse，一个先发送了，那么另外一个再发送就无效；
```

> injected script和content-script

content-script和页面内的脚本（injected-script自然也属于页面内的脚本）之间唯一共享的东西就是页面的DOM元素，有2种方法可以实现二者通讯：

- 可以通过window.postMessage和window.addEventListener来实现二者消息通讯；
- [通过自定义DOM事件来实现](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent) ;[旧版](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent)

```js
//第一种方法（推荐）：
//injected-script中：

window.postMessage({"test": '你好！'}, '*');

//content script中：

window.addEventListener("message", function(e)
{
    console.log(e.data);
}, false);
```
```js
//第二种方法：
//injected-script中：

var customEvent = document.createEvent('Event');
customEvent.initEvent('myCustomEvent', true, true);
function fireCustomEvent(data) {
    hiddenDiv = document.getElementById('myCustomEventDiv');
    hiddenDiv.innerText = data
    hiddenDiv.dispatchEvent(customEvent);
}
fireCustomEvent('你好，我是普通JS！');

//content-script.js中：

var hiddenDiv = document.getElementById('myCustomEventDiv');
if(!hiddenDiv) {
    hiddenDiv = document.createElement('div');
    hiddenDiv.style.display = 'none';
    document.body.appendChild(hiddenDiv);
}
hiddenDiv.addEventListener('myCustomEvent', function() {
    var eventData = document.getElementById('myCustomEventDiv').innerText;
    console.log('收到自定义事件消息：' + eventData);
});
```

## 长连接和短连接

Chrome插件中有2种通信方式

- 一个是短连接（chrome.tabs.sendMessage和chrome.runtime.sendMessage），
- 一个是长连接（chrome.tabs.connect和chrome.runtime.connect）

```js
//长连接
//popup.js：

getCurrentTabId((tabId) => {
    var port = chrome.tabs.connect(tabId, {name: 'test-connect'});
    port.postMessage({question: '你是谁啊？'});
    port.onMessage.addListener(function(msg) {
        alert('收到消息：'+msg.answer);
        if(msg.answer && msg.answer.startsWith('我是'))
        {
            port.postMessage({question: '哦，原来是你啊！'});
        }
    });
});

//content-script.js：

// 监听长连接
chrome.runtime.onConnect.addListener(function(port) {
    console.log(port);
    if(port.name == 'test-connect') {
        port.onMessage.addListener(function(msg) {
            console.log('收到长连接消息：', msg);
            if(msg.question == '你是谁啊？') port.postMessage({answer: '我是你爸！'});
        });
    }
});
```

