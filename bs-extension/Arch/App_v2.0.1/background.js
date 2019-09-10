//消息监听
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});
chrome.contextMenus.create({
    title: "测试右键菜单",
    id: "menu",
    visible: true,
    checked: true,
});
chrome.contextMenus.create({
    title: '使用度娘搜索：%s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    id: "menu3",
    visible: true,
    onclick: function(params)
    {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});
chrome.contextMenus.create({
    title: "测试右键菜单",
    id: "menu2",
    visible: true,
    checked: true,
    parentId: "menu",
    onclick: function(){alert('您点击了右键菜单！');}
});

// omnibox 
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log('inputChanged: ' + text);
    if(!text) return;
    if(text == '美女') {
        suggest([
            {content: '中国' + text, description: '你要找“中国美女”吗？'},
            {content: '日本' + text, description: '你要找“日本美女”吗？'},
            {content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
            {content: '韩国' + text, description: '你要找“韩国美女”吗？'}
        ]);
    }
    else if(text == '微博') {
        suggest([
            {content: '新浪' + text, description: '新浪' + text},
            {content: '腾讯' + text, description: '腾讯' + text},
            {content: '搜狐' + text, description: '搜索' + text},
        ]);
    }
    else {
        suggest([
            {content: '百度搜索 ' + text, description: '百度搜索 ' + text},
            {content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
        ]);
    }
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('inputEntered: ' + text);
    if(!text) return;
    var href = '';
    if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
    else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
    else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
    else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
    openUrlCurrentTab(href);
});
// 获取当前选项卡ID
function getCurrentTabId(callback)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
    getCurrentTabId(tabId => {
        chrome.tabs.update(tabId, {url: url});
    })
}
//通知
var notificationId = "id1";
//region {variables and functions}
var oneMinuteAsMilliseconds = 1 * 60 * 1000;
//getTime returns the number of milliseconds since the epoch
var currentTimeAsMilliseconds = new Date().getTime();
// var NOTIFICATION_TEMPLATE_TYPE = {
//     BASIC: "basic",
//     IMAGE: "image",
//     LIST: "list",
//     PROGRESS: "progress"
// };
var myButton1 = {
    title: "欢迎去我的快递公司（github）",
    iconUrl: "assets/icons/icon.png"//相對於擴充目錄底下的路徑
};
var myButton2 = {
    title: "还有好多业务正在拓展中哦",
    iconUrl: "assets/icons/icon.png"//相對於擴充目錄底下的路徑
};
// var myItem1 = {
//     title: "項目標題1",
//     message: "項目內容"
// };
// var myItem2 = {
//     title: "項目標題2",
//     message: "項目內容"
// };
var notificationOptions = {
    type: 'basic',
    iconUrl: 'assets/icons/icon.png',
    title: 'Arch 2019 祝你新年快乐',
    message: '这里有一个新版本包裹，请签收',
    contextMessage: "一些次要信息",
    eventTime: currentTimeAsMilliseconds + oneMinuteAsMilliseconds,
    buttons: [myButton1, myButton2],
    // imageUrl : "icon.png",
    // items: [myItem1, myItem2], //如果type是basic這個屬性就會沒有作用
    // progress : 0,
    isClickable: true
};
chrome.notifications.create(notificationId, notificationOptions, function(id) {
    console.log("create: " + id);
    chrome.notifications.getAll(function(notifications) {
        console.log("getAll:");
        console.log(notifications);
    });
});

chrome.notifications.onClicked.addListener(function(id) { //notification-id
    console.log("onClicked: " + id);
    notificationOptions.title =  "包裹正在打开...";
    chrome.notifications.update(notificationId, notificationOptions, function(wasUpdated) {
        console.log("update: " + wasUpdated);
    });
});
chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
    console.log("onClosed: " + notificationId);
});
chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
    console.log("onButtonClicked: " + buttonIndex);
    if(buttonIndex == 0){
        chrome.windows.create({ "url": "https://github.com/mmicome" });
    }
});


//将data数据以桌面通知的方式显示给用户, 封装
function _showDataOnPage(data) {

    //显示一个桌面通知
    if (window.webkitNotifications) {
        var notification = window.webkitNotifications.createNotification(
            'images/icon.png', // icon url - can be relative
            '通知的title!', // notification title
            data // notification body text
        );
        notification.show();
        // 设置3秒后，将桌面通知dismiss
        setTimeout(function () {
            notification.cancel();
        }, 3000);

    } else if (chrome.notifications) {
        var opt = {
            type: 'basic',
            title: '通知的title!',
            message: data,
            iconUrl: 'images/icon.png',
        }
        chrome.notifications.create('', opt, function (id) {
            setTimeout(function () {
                chrome.notifications.clear(id, function () {});
            }, 3000);
        });

    } else {
        alert('亲，你的浏览器不支持啊！');
    }
}
