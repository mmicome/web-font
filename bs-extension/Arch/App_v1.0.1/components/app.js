var doc = document.currentScript.ownerDocument,
XappProto = Object.create(HTMLElement.prototype);

XappProto.setData = function () {
var app = this.shadow,
    header = app.querySelector("header"),
    article = app.querySelector("article");

header.textContent = this.getAttribute('title');
header.setAttribute('data-action', this.getAttribute('action'));
header.setAttribute('data-url', this.getAttribute('url'));
article.textContent = this.getAttribute('content');

if (this.getAttribute('sign')) {
    var swh = doc.createElement('sign');
    this.shadow.appendChild(swh);
}
header.onclick = function () {
    var action = this.getAttribute("data-action");
    var url = this.getAttribute("data-url");
    // var bg = chrome.extension.getBackgroundPage();
    // bg.tools[action](url);
    sendMessageToContentScript({
        action: action,
        data: url
    });
}
};

XappProto.createdCallback = function () {
var template = doc.querySelector("#app-template"),
    app = template.content.cloneNode(true);

this.shadow = this.createShadowRoot();
this.shadow.appendChild(app);
};

XappProto.attachedCallback = function () {
this.setData();
};

var Xapp = doc.registerElement("app", {
"prototype": XappProto
});
