var gulp = require("gulp"),
    gulpif = require('gulp-if'),    //提供条件判断
    gulpIgnore = require('gulp-ignore'), //根据条件忽略部分内容

    //minifycss = require('gulp-minify-css'),  //CSS压缩
    cssnano=require('gulp-cssnano'),  //CSS压缩  代替minifycss
    //htmlmin=require('gulp-htmlmin'),//压缩html，原本是用来替代gulp-minify-html，但发现其存在问题
    minifyHtml = require("gulp-minify-html"),//压缩html
    concat = require('gulp-concat'),         // 文件合并
    uglify = require('gulp-uglify'),         //js压缩插件
    rename = require('gulp-rename'),         // 重命名
    replace = require('gulp-replace'),      //对指定文件进行内容替换
    processhtml=require('gulp-processhtml'),    //对html中的内容进行处理

    copy=require('gulp-copy-rex'),
    rimraf=require('gulp-rimraf'),//清理目录，用来替代gulp-clean
    browserSync = require('browser-sync');  
   
require('gulp-grunt')(gulp); // add all the gruntfile tasks to gulp

var outputDir='dist';//输出目录
var appConfig = {
    app: require('./package.json').appPath || 'app',
    dist: 'dist',
    processConfig: {
        js: {
            compress: false,
            concat: false
        },
        html: {
            compress: false,
            concat: false
        },
        css: {
            compress: false,
            concat: false
        }
    },
    getSrcDir:function(src){
        return this.app+src;
    }
};
// Start the server  
gulp.task('browser-sync', function() {  
    browserSync({  
        server: {  
            baseDir: "./app"  
        }  
    });  
});  

gulp.task('clean', function(cb) {//这里使用了并行任务等待
    //del(['minified/css', 'minified/js'], cb);
    rimraf(appConfig.dist, cb);
    cb();//任务执行结束
});

gulp.task('process-css', function() {
    return gulp.src(appConfig.getSrcDir('/**/*.css'))                  //压缩的文件
        .pipe(gulpif(appConfig.processConfig.css.concat,concat("app.css")))
        .pipe(gulpif(appConfig.processConfig.css.compress, cssnano())) //压缩
        .pipe(gulp.dest(appConfig.dist));        //输出文件夹
});

gulp.task('process-html', function () {
    var processhtml_opts = { /* plugin options */ };
    var process_condition = function (file) {
        // TODO: add business logic
        return true;
    }
    gulp.src(appConfig.getSrcDir('/**/*.html')) // 要压缩的html文件
        .pipe(gulpif(appConfig.processConfig.html.compress, minifyHtml())) //压缩
        .pipe(processhtml(processhtml_opts))
        //.pipe(gulpif(process_condition, uglify(), beautify()))

        .pipe(gulp.dest(appConfig.dist));
});

gulp.task("process-js",function(){
    return gulp.src([appConfig.getSrcDir("/**/*.js")])
        .pipe(gulpif(appConfig.processConfig.js.concat,concat("app.js")))
        .pipe(gulpif(appConfig.processConfig.js.compress, uglify()))
        .pipe(gulp.dest(appConfig.dist));
});

gulp.task('grunt-all',['grunt-for-gulp']);//调用grunt中的任务，详见Gurntfile.js

gulp.task("default",["clean"],function(){
    gulp.start('copy','process-css', 'process-js','process-html');  // 要执行的任务
});

gulp.task('copy', function () {
    var files = {
        css_files: {
            source: [
                './bower_components/bootstrap/dist/css/bootstrap.min.css'
            ],
            dist: appConfig.dist+'/styles',
            opts:null
        },
        font_files: {
            source: ['./bower_components/bootstrap/dist/fonts/*.*'],
            dist: appConfig.dist+'/fonts',
            opts:null
        },
        bootstrap_js_files:{
            source: ['./bower_components/bootstrap/dist/js/bootstrap.min.js'],
            dist: appConfig.dist+'/lib/bootstrap',
            opts:null
        },
        jquery_js_files:{
            source: ['./bower_components/jquery/dist/jquery.min.js'],
            dist: appConfig.dist+'/lib/jquery',
            opts:null
        },
        angular2_js_files:{
            source: ['./node_modules/angular2/**/*.js'],
            dist: appConfig.dist+'/lib/angular2',
            opts:null
        }
    };

    for (var item in files){
        copy(files[item].source,files[item].dist,files[item].opts);
    }
});

// 将bower的库文件对应到指定位置  
gulp.task('refBowerComponents',function() {  
    gulp.src('./bower_components/vue/dist/vue.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/jquery/dist/jquery.min.js')  
        .pipe(gulp.dest('./app/vender/js'));  
    gulp.src('./bower_components/jquery/dist/jquery.min.map')  
        .pipe(gulp.dest('./app/vender/js'));  
    //css  
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')  
        .pipe(gulp.dest('./app/vender/css/'));  
});  
// Compile SASS & auto-inject into browsers  
gulp.task('sass', function () {  
    return gulp.src('./app/sass/*.scss')  
        .pipe(sass({includePaths: ['scss']}))  
        .pipe(gulp.dest('./app/styles/style.css'))  
        .pipe(browserSync.reload({stream:true}));  
});  
  
// Reload all Browsers  
gulp.task('bs-reload', function () {  
    browserSync.reload();  
});  
 var files = [  
    './app/*.html',  
    './app/images/**/*.*',  
    './app/views/**/*.html',  
    './app/scripts/**/*.js',  
    './app/styles/**/*.css'  
  ];  
// Watch scss AND html files, doing different things with each.  
gulp.task('default', ['browser-sync'], function () {  
    gulp.watch("scss/*.scss", ['sass']);  
    gulp.watch(files, ['bs-reload']);  
});  