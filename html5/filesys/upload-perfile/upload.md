### 1.通过传统的form表单提交的方式上传文件
```html
<form id= "uploadForm" action= "http://localhost:8080/cfJAX_RS/rest/file/upload" method= "post" enctype ="multipart/form-data">  
     <h1 >测试通过Rest接口上传文件 </h1>  
     <p >指定文件名： <input type ="text" name="filename" /></p>  
     <p >上传文件： <input type ="file" name="file" /></p>  
     <p >关键字1： <input type ="text" name="keyword" /></p>  
     <p >关键字2： <input type ="text" name="keyword" /></p>  
     <p >关键字3： <input type ="text" name="keyword" /></p>  
     <input type ="submit" value="上传"/>  
</form>  
```
> 传统的form表单提交会导致页面刷新，但是在有些情况下，我们不希望页面被刷新，这种时候我们都是使用Ajax的方式进行请求的：

### 2.ajax 异步请求
```js
$.ajax({
	url:"http://localhost:8080/STS/rest/user",
	type:"POST",
	data:$('#postForm').serialize(),
	success : function(data) {  
	     $( '#serverResponse').html(data);  
	},  
	error : function(data) {  
	     $( '#serverResponse').html(data.status + " : " + data.statusText + " : " + data.responseText);  
	}  
})
```
> 通过$('#postForm').serialize()可以对form表单进行序列化，从而将form表单中的所有参数传递到服务端。但是上述方式，只能传递一般的参数，上传文件的文件流是无法被序列化并传递的。不过如今主流浏览器都开始支持一个叫做FormData的对象，有了这个FormData，我们就可以轻松地使用Ajax方式进行文件上传了。

> FormData 对象，可以把form中所有表单元素的name与value组成一个queryString，提交到后台。在使用Ajax提交时，使用FormData对象可以减少拼接queryString的工作量。

> XMLHttpRequest Level 2添加了一个新的接口FormData.利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单".比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件.

***使用FormData对象***
1.创建一个FormData空对象，然后使用append方法添加key/value
- [javascript]
var formdata = new FormData();  
formdata.append('name','fdipzone');  
formdata.append('psw','male');  
2.取得form对象，作为参数传入到FormData对象
- [html]
```html
<form name="form1" id="form1">  
<input type="text" name="name" value="fdipzone">  
<input type="password" name="psw" value="male">  
</form>
```  
- [javascript]
```js
var form = document.getElementById('form1');  
var formdata = new FormData(form);  
var name = formData.get("name"); // 获取名字
var psw = formData.get("psw"); // 获取密码
// 当然也可以在此基础上，添加其他数据
formData.append("token","kshdfiwi3rh");
```

### 3.使用formdata 原生js
```js
var oData = new FormData(document.forms.namedItem("fileinfo" ));  
oData.append( "CustomField", "This is some extra data" );  
var oReq = new XMLHttpRequest();  
oReq.open( "POST", "stash.php" , true );  
oReq.onload = function(oEvent) {  
      if (oReq.status == 200) {  
          oOutput.innerHTML = "Uploaded!" ;  
     } else {  
          oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";  
     }  
};  
oReq.send(oData);  
```
### 4.使用FormData，进行Ajax请求并上传文件
```js
$.ajax({
    url: '/upload',
    type: 'POST',
    cache: false,
    data: new FormData($('#uploadForm')[0]),
    processData: false,
    contentType: false
}).done(function(res) {
}).fail(function(res) {});
```
**这里要注意几点：**

- processData设置为false。因为data值是FormData对象，不需要对数据做处理。
- <form>标签添加enctype="multipart/form-data"属性。
- cache设置为false，上传文件不需要缓存。
- contentType设置为false。因为是由<form>表单构造的FormData对象，且已经声明了属性enctype="multipart/form-data"，所以这里设置为false。
- 上传后，服务器端代码需要使用从查询参数名为file获取文件输入流对象，因为input中声明的是name="file"
