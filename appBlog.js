var log = console.log.bind(console)
// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var cors = require('cors')
app.use(cors());

app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))

const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        // 下面这段是重点
        app[route.method](route.path, route.func)
    }
}
// 上面的 app[route.method] 相当于下面的代码
// app.get('/', function(request, response){
//
// })
// 又相当于下面的代码
// app['get']('/', function(request, response)


// const routeModules = [
//     './route/index',
//     './route/blog',
//     './route/comment',
// ]

// 导入 route/index.js 的所有路由数据
const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)

// 导入 route/blog 的所有路由数据
const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)

// 导入 route/comment 的所有路由数据
const routeComment = require('./route/comment')
registerRoutes(app, routeComment.routes)


// //设置跨域访问(添加这段)
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });



// 导入 route/comment 的所有路由数据
const routeList = require('./route/list')
registerRoutes(app, routeList.routes)

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8084, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//10.25新增，使用mongoose
// connectData是选择链接的那个数据库
var connectData = 'vip'
// app.js
var mongoose = require('mongoose');
var dburl = "mongodb://127.0.0.1:27017/" + connectData
mongoose.connect(dburl)     //连接本地数据库blog

var db = mongoose.connection;

// 连接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 连接失败
db.on('error', function(){
    console.log('MongoDB Connection Error');
});

// 19.1.9新增——用来请求接口，并写入json文件
const apiData = require('./model/apiData')
apiData.new()