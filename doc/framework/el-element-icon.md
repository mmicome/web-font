# el-element icon 拓展方案

- 引入 [fontAwesomeIcon](https://github.com/FortAwesome/vue-fontawesome)icon
- 引入[阿里icon](https://www.iconfont.cn/home/index)
- 本地图片自定义icon

## 引入 [fontAwesomeIcon](https://github.com/FortAwesome/vue-fontawesome)

## 引入[阿里icon](https://www.iconfont.cn/home/index) 其他图标库类似

## 本地图片自定义icon

原理： `el-element` 是将`icon`标识内容放在 class 内， 故而可以自定义 `el-ext*` 样式于字体文件， 然后引入该文件

```css
.el-extclame{
  background: url(../icon/clame.png) center no-repeat;
  background-size: cover;
}
.el-extclame:before{
  content: "\66ff";
  font-size: 14px;
  visibility: hidden;
}
```
