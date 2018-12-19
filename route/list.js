var log = console.log.bind(console)

const comment = require('../model/list')

var all = {
    // path: '/api/comment/all',
    path: '/list/all',
    method: 'get',
    func: function(request, response) {
        //查找所有的文件
        var data = comment.all()
        data.then(function(comments) {
            log(2222222, comments)
            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

var add = {
    path: '/list/add',
    // method: 'post',
    method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        // var form = request.body
        // // 插入新数据并返回
        // var b = comment.new(form)
        // var r = JSON.stringify(b)
        // response.send(r)
        var data = comment.new({
            author: 'jq',
            content: '1220561194@qq.com',
            blog_id: '2'
        })
        data.then(function(comments) {
            // log(2222222, comments)
            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

//修改用户信息
var save = {
    path: '/list/save',
    // method: 'post',
    method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        // var form = request.body
        // // 插入新数据并返回
        // var b = comment.new(form)
        // var r = JSON.stringify(b)
        // response.send(r)
        var obj = {
            id: 2,
            username: '999999'
        }
        var data = comment.save(obj)
        data.then(function(comments) {
            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

//删除用户
var remove = {
    path: '/list/remove',
    // method: 'post',
    method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        // var form = request.body
        // // 插入新数据并返回
        // var b = comment.new(form)
        // var r = JSON.stringify(b)
        // response.send(r)
        var obj = {
            id: 3,
        }
        var data = comment.remove(obj)
        data.then(function(comments) {
            // log(2222222, comments)
            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

// -------------------------------------------------------------
//12.19新增一个post请求,存储错误信息
var addError = {
    path: '/list/addError',
    method: 'post',
    // method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        var errorMsg = form.e || ''
        var uid = form.uid || ''
        var data = comment.new({
            author: 'jq',
            content: '1220561194@qq.com',
            blog_id: uid,
            errorMsg: errorMsg,
        })
        data.then(function(comments) {
            // log(2222222, comments)
            var r = JSON.stringify(comments)
            response.send(r)
        })
        return

        // // 插入新数据并返回
        // var b = comment.new(form)
        // var r = JSON.stringify(b)
        // response.send(r)
        var obj = {
            id: 3,
        }
        var data = comment.remove(obj)
        data.then(function(comments) {
            // log(2222222, comments)
            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

//12.19新增一个get请求，用来查询一个id的数据
// var detailBlog = {
//     path: '/api/blog/:id',
//     method: 'get',
//     func: function(request, response) {
//         var id = Number(request.params.id)
//         var b = blog.get(id)
//         console.log('blog detail', request.params.id, id, b)
//         var r = JSON.stringify(b)
//         response.send(r)
//     }
// }

var find = {
    path: '/list/find',
    method: 'get',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 query
        //get传递过来的参数
        var query = request.query
        var data = comment.find(query)
        data.then(function(comments) {
            //12.19新增添加时间的函数
            comments = addCjuu(comments)

            var r = JSON.stringify(comments)
            response.send(r)
        })
    }
}

//12.19新增添加时间的函数
var addCjuu = function(arr) {
    arr = arr || []
    log(1111, arr)
    for(var i = 0; i < arr.length; i++) {
        var arrChild = arr[i]
        log(7777, arrChild)
        var created_time = arr[i].created_time
        log(22222, created_time)
        var timeUnit = getLocalTime(created_time)
        log(999, typeof arrChild)
        arrChild.timeUnit = timeUnit
        log(666, arrChild)
    }
    return arr
}
function getLocalTime(nS) {
    var dataTime = new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    return dataTime
}

var routes = [
    all,
    add,
    save,
    remove,
//12.19新增一个post请求,存储错误信息
    addError,
    //查找相应的数据
    find,
]

module.exports.routes = routes
