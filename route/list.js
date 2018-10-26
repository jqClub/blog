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
            // log(2222222, comments)
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

var routes = [
    all,
    add,
    save,
    remove,
]

module.exports.routes = routes
