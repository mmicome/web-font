# Chrome-Extension

总结， 梳理， 汇总， 体系

```js
var wrap = document.querySelectorAll('.nfli');
var arr = [];
for (var i = 0; i < wrap.length; i++) {
    var a = wrap[i].querySelectorAll(".box > a:first-child");
    var arrtmp = [];
    for (var j = 0; j < a.length-1; j++) {
        var b = {
            title: a[j].textContent,
            url: a[j].getAttribute("href"),
            action: "refer",
            content: a[j].getAttribute("title"),
            sign: "false"
        };
        arrtmp.push(b);
    }
    arr.push(arrtmp);
}
console.log(arr);
JSON.stringify(arr);
```

https://uptodate.frontendrescue.org/zh/

http://www.fly63.com/nav
