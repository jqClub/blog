# ndoe-express博客程序
![](show/blog_index.png)
![](show/blog_detail.png)
```
使用下面的功能实现博客程序
node
express
ajax


文件分布如下
- appBlog.js        后端程序主文件
- blog.js           处理 blog 数据存取的文件
- blog.json         存储 blog 数据的文件(相当于数据库)
- blog_index.html   博客主页的 html 文件
- blog_detail.html  博客详情页面 html 文件


运行程序方式如下
node appBlog.js
```

//////////////////////////////////////////////
//	@author: 姜奇 (604799292@qq.com)
//	@version: 1.0.0.1 2018.10.22 新增mongodb模块，可以实现查找，增加，删除，修改内容
              1.0.0.2 2018.10.25 安装Mongoose，来使用mongodb

//////////////////////////////////////////////
备注：
1.Mongoose操作schema时默认表名添加s以及解决
module.exports = mongoose.model('Page',userSchema,"name");

