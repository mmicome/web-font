# el-element icon 拓展方案

- 引入 [fontAwesomeIcon](https://github.com/FortAwesome/vue-fontawesome)icon
- 引入[阿里icon](https://www.iconfont.cn/home/index)
- 本地图片自定义icon

## 引入 [fontAwesomeIcon](https://github.com/FortAwesome/vue-fontawesome)



## 引入[阿里icon](https://www.iconfont.cn/home/index) 其他图标库类似

1. 安装基础依赖（已安装忽略）
```sh
$ npm i --save @fortawesome/fontawesome
$ npm i --save @fortawesome/vue-fontawesome
```
2. 安装样式依赖（已安装忽略）
```sh
$ npm i --save @fortawesome/fontawesome-free-solid
$ npm i --save @fortawesome/fontawesome-free-regular
$ npm i --save @fortawesome/fontawesome-free-brands
```
3. 配置
```js
//进入main.js文件配置Font Awesome，配置方式比起4以前多了一些代码

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)
```
4. 使用
- [进入]https://fontawesome.com/icons?d=gallery
- 选择icon（复制对应代码到需要引用icon的位置）如： `<font-awesome-icon :icon="['fas','user]"/>`

**附：** [其他方式，按需引入](https://github.com/FortAwesome/vue-fontawesome)

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
