(function() {
    var origOpen = XMLHttpRequest.prototype.open;
    
    XMLHttpRequest.prototype.open = function() {
        // console.log('request started!');
        var args = arguments;
        this.addEventListener('load', function() {
            //chrome.runtime.sendMessage(this.responseText, function(response) {
            //    console.log('收到来自后台的回复：' + response);
            //});
            // if(sign && args[1] == url)
            // {
                
            //     setTimeout(tools.daka, 200);
            // }
            //console.log(this.responseText); // 得到Ajax的返回内容 数据爬取
        });
        origOpen.apply(this, arguments);
    };
})();
