## popular plugins list

```js
var gulp = require('gulp'); // 自动化构建项目的工具
var fs = require('fs'); // node内置的文件系统模块
var path = require('path'); // node内置的路径拼接处理模块
var runSequence = require('run-sequence'); // 按照指定顺序执行task任务的插件, gulp3.x需要，gulp4.x新的api原生支持（https://blog.skk.moe/post/update-gulp-to-4/）
var opn = require('opn'); // 自动打开浏览器
var uglify = require('gulp-uglify'); // 压缩混淆js的gulp插件
var jshint = require('gulp-jshint'); // 使用eslint进行代码校验
var eslint = require('gulp-eslint'); // 使用eslint进行代码校验,支持 ES6 JSX
var cleanCss = require('gulp-clean-css'); // 压缩css的gulp插件
var autoprefixer = require('gulp-autoprefixer'); // css样式自动添加浏览器内核前缀，如-webkit,-moz,-o
var htmlmin = require('gulp-htmlmin'); // 压缩html文件的gulp插件
var imagemin = require('gulp-imagemin'); // 压缩PNG, JPEG, GIF and SVG格式的图片的gulp插件
var babel = require('gulp-babel'); // 转义es6语法的gulp插件
var sass = require('gulp-sass'); // 编译sass的gulp插件
var less = require('gulp-less'); // 编译less的gulp插件
var concat = require('gulp-concat'); // 合并文件的gulp插件
var gulpIf = require('gulp-if'); // 条件判断
var connect = require('gulp-connect'); // 创建web服务器的gulp插件
browser-sync ： 浏览器自动刷新 （http://www.browsersync.cn/docs/gulp/）
var rename = require('gulp-rename'); // 重命名插件
var plumber = require('gulp-plumber'); // Prevent pipe breaking caused by errors from gulp plugins(捕获错误))
var preprocess = require('gulp-preprocess'); // 在html和JS中自定义环境变量的gulp插件

gulp-coffee ： 编译CoffeeScript
gulp-mocha ： 执行Mocha测试
gulp-bump ： 更新版本号



```
