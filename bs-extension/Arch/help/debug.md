## 如何调试popup

需要调试这个页面，不能够通过点击icon的弹出页面调试，需要单独开启这个页面才行，但是这个页面具体的url是哪个呢？经过寻找，发现这样的url是：

`chrome-extension://your app id/popup.html`

例如正在开发一款工具，popup.html的地址就是: 

`chrome-extension://okbmjnfimbkiocogpepgjfhknknehime/popup.html`

不仅是这个页面，其他的页面也可以通过这样的方式来访问和调试。

`your app id`: 见谷歌插件管理页面
