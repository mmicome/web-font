### XMLHttpRequest level2

- 允许跨域
- `progress` 事件监听请求进度
- 必须使用HTTP 中`origin `信息头
- 数据接受服务器必须具备`CORS`策略 [参考网址](http://enable-cors.org)

> `jsonp` 利用 `script` 标签里的跨域特性进行跨域数据访问，`src`属性为一个跨域URL，实际执行时，是通过该URL获得一段字符串，该字符串是一个合法的 `javascript` 调用，通过 `eval` 方法执行该字符串对获得的数据进行处理

> `websocket` 也支持跨域通信

**XHR level 2 支持情况**

| 浏览器 | 支持版本 |
| :---: | :-----: |
| chrome | 2.0+ |
| Firefox | 3.5+ |
| IE | 10.0+ |
| opera | 12.0+ |
| Safari | 4.0+ |

