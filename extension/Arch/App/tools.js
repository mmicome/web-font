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
        alert(123)
    }
}
//通知
// chrome.notifications.create(null, {
//     type: 'basic',
//     iconUrl: 'assets/icons/icon.png',
//     title: '2019 祝你新年快乐',
//     message: '这里有一个新版本包裹，请签收'
// });

