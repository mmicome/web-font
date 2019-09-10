### cookie的限制

- 大小5KB
- 同一域名最多20个
- 每次发送HTTP请求会将cookie发送至服务器，影响访问速度，不够高效
- 队列式挤出覆盖

### web应用解决方案

- IE       ‘Uer Data’
- google   'Gears'
- flash    'cookie'

### html5

[web storage](http://dev.w3.org/html5/webstorage)

**方法**
- setItem(key,value)
- getItem(key)
- removeItem(key)
- key(n)
- clear()

`example`: `localStorage.setItem('1','test');`

**主流浏览器LocalStorage**

| 浏览器   | 格式    |  加密   | 存放路径 |
| :-----: | :----: | :----: | :---------------------------------------------------------------------------------------- |
| Firefox | SQLite | 明文    | C:\Users\user\AppData\Roaming\Mozilla\FireFox\Profile\tyraqe3f.default\webappsstore.sqlite |
| Chrome  | SQLite | 明文    | C:\Users\user\AppData\Local\Google\Chrome\User Data\Default\Local Storage\                 |
| IE      | XML    | 明文    | C:\Users\user\AppData\Local\Micosoft\IE\DOMStore\                                          |
| Safari  | SQLite | 明文    | C:\Users\user\AppData\Local\Apple Computer\Safari\LocalStorage\                            |
| Opera   | XML    | base64 | C:\Users\user\AppData\Roaming\OPera\Opera\pstorage\                                        |

LocalStorage 持久化数据存储
SessionStorage 会话存储，实现于浏览器进程内，即关即销


