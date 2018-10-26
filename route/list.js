var log = console.log.bind(console)

const comment = require('../model/list')

var all = {
    // path: '/api/comment/all',
    path: '/list/all',
    method: 'get',
    func: function(request, response) {
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
        var newUser = new userModel({
            username: 'jq',
            email: '1220561194@qq.com'
        })
        newUser.save(function(err, data){
            if(err){ return console.log(err) }
            log(333, data)
            response.send(data)
            // res.redirect('/users/list');
        })
    }
}

var routes = [
    all,
    add,
]

module.exports.routes = routes
