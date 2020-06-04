##  动态注入或执行JS

虽然在background和popup中无法直接访问页面DOM，但是可以通过chrome.tabs.executeScript来执行脚本，从而实现访问web页面的DOM（注意，这种方式也不能直接访问页面JS）。

```js
// 动态执行JS代码
chrome.tabs.executeScript(tabId, {code: 'document.body.style.backgroundColor="red"'});
// 动态执行JS文件
chrome.tabs.executeScript(tabId, {file: 'some-script.js'});
```

## 动态注入CSS

```js
// 动态执行CSS代码，TODO，这里有待验证
chrome.tabs.insertCSS(tabId, {code: 'xxx'});
// 动态执行CSS文件
chrome.tabs.insertCSS(tabId, {file: 'some-style.css'});
```

## 获取当前窗口ID

```js
chrome.windows.getCurrent(function(currentWindow)
{
    console.log('当前窗口ID：' + currentWindow.id);
});
```

## 获取当前标签页ID

一般有2种方法：

```js
// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}
//获取当前选项卡id的另一种方法，大部分时候都类似，只有少部分时候会不一样（例如当窗口最小化时）

// 获取当前选项卡ID
function getCurrentTabId2()
{
    chrome.windows.getCurrent(function(currentWindow)
    {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs)
        {
            if(callback) callback(tabs.length ? tabs[0].id: null);
        });
    });
}
```

## 本地存储

本地存储建议用chrome.storage而不是普通的localStorage，区别有好几点，个人认为最重要的2点区别是：

- chrome.storage是针对插件全局的，即使你在background中保存的数据，在content-script也能获取到；
- chrome.storage.sync可以跟随当前登录用户自动同步，这台电脑修改的设置会自动同步到其它电脑，很方便，如果没有登录或者未联网则先保存到本地，等登录了再同步至网络；

```js
//需要声明storage权限，有chrome.storage.sync和chrome.storage.local2种方式可供选择，使用示例如下：

// 读取数据，第一个参数是指定要读取的key以及设置默认值
chrome.storage.sync.get({color: 'red', age: 18}, function(items) {
    console.log(items.color, items.age);
});
// 保存数据
chrome.storage.sync.set({color: 'blue'}, function() {
    console.log('保存成功！');
});
```

## webRequest

```js
//通过webRequest系列API可以对HTTP请求进行任性地修改、定制

//manifest.json
{
    // 权限申请
    "permissions":
    [
        "webRequest", // web请求
        "webRequestBlocking", // 阻塞式web请求
        "storage", // 插件本地存储
        "http://*/*", // 可以通过executeScript或者insertCSS访问的网站
        "https://*/*" // 可以通过executeScript或者insertCSS访问的网站
    ],
}


// background.js
// 是否显示图片
var showImage;
chrome.storage.sync.get({showImage: true}, function(items) {
    showImage = items.showImage;
});
// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
    // cancel 表示取消本次请求
    if(!showImage && details.type == 'image') return {cancel: true};
    // 简单的音视频检测
    // 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
    if(details.type == 'media') {
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'img/icon.png',
            title: '检测到音视频',
            message: '音视频地址：' + details.url,
        });
    }
}, {urls: ["<all_urls>"]}, ["blocking"]);
```

## 国际化

插件根目录新建一个名为_locales的文件夹，再在下面新建一些语言的文件夹，如en、zh_CN、zh_TW，然后再在每个文件夹放入一个messages.json，同时必须在清单文件中设置default_locale。

```js
//_locales\en\messages.json内容：

{
    "pluginDesc": {"message": "A simple chrome extension demo"},
    "helloWorld": {"message": "Hello World!"}
}
//_locales\zh_CN\messages.json内容：

{
    "pluginDesc": {"message": "一个简单的Chrome插件demo"},
    "helloWorld": {"message": "你好啊，世界！"}
}
//在manifest.json和CSS文件中通过__MSG_messagename__引入，如：

{
    "description": "__MSG_pluginDesc__",
    // 默认语言
    "default_locale": "zh_CN",
}

//JS中则直接chrome.i18n.getMessage("helloWorld")。
//测试时，通过给chrome建立一个不同的快捷方式chrome.exe --lang=en来切换语言

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --lang=en"
```

## 查看已安装插件路径

已安装的插件源码路径：`C:\Users\用户名\AppData\Local\Google\Chrome\User Data\Default\Extensions`，每一个插件被放在以插件ID为名的文件夹里面，想要学习某个插件的某个功能是如何实现的，看人家的源码是最好的方法了：

## 调试

- 特别注意background的报错

很多时候你发现你的代码会莫名其妙的失效，找来找去又找不到原因，这时打开background的控制台才发现原来某个地方写错了导致代码没生效，正式由于background报错的隐蔽性(需要主动打开对应的控制台才能看到错误)，所以特别注意这点。

- 如何让popup页面不关闭

在对popup页面审查元素的时候popup会被强制打开无法关闭，只有控制台关闭了才可以关闭popup，原因很简单：如果popup关闭了控制台就没用了。这种方法在某些情况下很实用！

- 不支持内联JavaScript的执行

-  注入CSS的时候必须小心

通过content_scripts注入的CSS优先级非常高，几乎仅次于浏览器默认样式，稍不注意可能就会影响一些网站的展示效果，所以尽量不要写一些影响全局的样式。
