var doc = document.currentScript.ownerDocument,
XsignProto = Object.create(HTMLElement.prototype);

XsignProto.createdCallback = function () {
var template = doc.querySelector("#sign-template"),
    sign = template.content.cloneNode(true);
this.shadow = this.createShadowRoot();
this.shadow.appendChild(sign);
};
XsignProto.attachedCallback = function () {
var sh = this.shadow,
    sign = sh.querySelector("span");

sign[i].onclick = function () {
    if (this.classList.contains("close")) {
        this.classList.remove("close");
        this.style.background = "#74d8f1";
    } else {
        this.classList.add("close");
        this.style.background = "#ccc";
    }
}
if (!sign[i].classList.contains("close")) {
    var header = sign[i].parentNode.getElementsByTagName("header")[0];
    var action = header.getAttribute("data-action");
    var url = header.getAttribute("data-url");
    sendMessageToContentScript({
        action: action,
        data: url
    });
}
};
var Xsign = doc.registerElement('sign', {
'prototype': XsignProto
})
