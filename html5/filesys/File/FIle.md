##File(获取文件信息)
> property

- name
- type
- size
- lastModifiedDate

> method

- getAsBinary   | 已废弃
- getAsDataURL  | 已废弃  使用 FileReader 对象中的readAsDataURL() 方法作为替代。
- getAsText     | 已废弃

** multifile? File -> FileList**

##FileSystem(应用接口)
- FileReader & FileList (文件读取和处理)

  - readAsBinaryString 把文件内容以二进制的方式读取，并放在FileReader的result属性中，它接受Blob对象或者文件对象

  - readAsDataURL 
  将文件读取为dataURL,一般以data开头的字符串（base64,该数据可以被赋予图片src显示）并放在FileReader的result属性中，它接受Blob对象或者文件对象。

  - readAsText 把文件内容以文本字符串的方式读取，并放在FileReader的result属性中，它接受Blob对象或者文件对象。（可以为它指定编码格式）

  - abort 中断读取
  IE10以下的版本不支持FileReader()构造函数.不过可以利用滤镜来兼容旧版本的IE
  
- Blob & FileWriter (创建和写入)
***什么是Blob对象？***
> Blob对象就是选择文件的原始数据类型，它提供slice方法可以读取原始数据中某一块数据，如果上次文件较大，可以利用Blob可切割的特性将文件分批次上传。

- DirectoryReader & LocalFileSyetem (目录和文件系统访问)

##html5 & FIleSyetem 应用场景
- 断点续传，将本地文件保存在沙箱系统临时空间，逐块上传，异常关闭后，继续浏览机器文件系统获取并上传
  ***主要思路***:

	首次传输其流程如下
	
	1. 服务端向客户端传递文件名称和文件长度
	2. 跟据文件长度计算文件块数
	3. 客户端将传输的块数写入临时文件(做为断点值)
	4. 若文件传输成功则删除临时文件

	首次传输失败后将按以下流程进行

	1. 客户端从临时文件读取断点值并发送给服务端
	2. 服务端与客户端将文件指针移至断点处
	3. 从断点处传输文件

	这是当时的思路，但是因为当时用了CFile类实现，而不是SDK，所以我不得不重写，重写时断点续传又重新成了问题

	1. 下载的是文件列表
	2. 因为效率不再采用分块传输
	3. 如何记录文件列表与断点值

	鉴于我以前做的断点续传，其思路如下

	1. 客户端用CreateFile以OPEN_EXISTING方式打开要下载的文件列表
	2. 若成功说明有断点文件,则用GetFileSize得到大小做为断点
	3. 若失败说明文件不存在,则创建一个文件

- 存放网络游戏图片相关资源
- 离线图片应用
- 离线视频播放，边下边播，选择时间点播放，截取视频
- 离线邮箱系统，
- 文件压缩
  ***主要思路***:1.读取图片 readAsDataURL  2.创建image对象，获取图片的原始尺寸大小  3.创建
  canvas，把图片付给canvas，绘制，设置绘制的大小这就相当于压缩canvas.drawImage(img, 0, 0, height, width)  4.把canvas又转成dataURL的形式。压缩完成

- 图片预览
  ***主要思路***: 将选择的图片文件转换成DataURL的形式，再把dataURL赋给img标签的src属性即可，因此我们的第一种方法是利用FileReader 的readAsDataURL方法，转换为我们想要的数据格式。
- 。。。

