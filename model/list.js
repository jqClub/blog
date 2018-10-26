var log = console.log.bind(console)

var userModel = require('../util/userModel.js');
userModel = userModel.name

var fs = require('fs')

var filePath = 'db/comment.json'


// 这是一个用来存储 comment 数据的对象
const ModelComment = function(form) {
    this.username = form.author || ''
    this.email = form.content || ''

    // || 是一种新的写法, 在 js 圈子里太过流行, 所以记住即可
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
    // this.author = form.author || ''
    // this.content = form.content || ''
    this.blog_id = Number(form.blog_id || 0)
    // 生成一个 unix 时间, unix 时间是什么, 上课会说
    this.created_time = Math.floor(new Date() / 1000)
}

const loadData = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(filePath, 'utf8')
    var data = JSON.parse(content)
    return data
}


var b = {
    // data: loadData()
}

b.all = function() {
        log('进入了all函数')
    //這里返回一个promise对象，可以链式的调用。
    //也可以直接使用回调函数
    var p = new Promise(function(resolve, reject){
        userModel.find({}, function(err, data){
            if(err){ return console.log(err) }
            log(222222, data)
            resolve(data)
        })
    });
    return p
    // // return this.data
}

b.new = function(form) {
    var m = new ModelComment(form)
    var newUser = new userModel(m)
    // userModel.find({}, function(err, rdata){
    //     if(err){ return console.log(err) }
    //
    //     var len = rdata.length
    //     // // 设置新数据的 id
    //     var d = rdata[len-1]
    //     log(999999, d)
    //     if (d == undefined) {
    //         oneData.id = 1
    //     } else {
    //         oneData.id = d.id + 1
    //     }
    //     log(222222, oneData)
    //     resolve(oneData)
    // })

    var p = new Promise(function(resolve, reject){
        newUser.save(function(err, data){
            if(err){ return console.log(err) }
            resolve(data)
        })
    });
    return p
    // var m = new ModelComment(form)
    // // 设置新数据的 id
    // var d = this.data[this.data.length-1]
    // if (d == undefined) {
    //     m.id = 1
    // } else {
    //     m.id = d.id + 1
    // }
    // // 把 数据 加入 this.data 数组
    // this.data.push(m)
    // // 把 最新数据 保存到文件中
    // this.save()
    // // 返回新建的数据
    // return m
}

b.save = function() {
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
    // var s = JSON.stringify(this.data, null, 2)
    // fs.writeFile(filePath, s, (err) => {
    //   if (err) {
    //       console.log(err)
    //   } else {
    //       console.log('保存成功')
    //   }
    // })
}


// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b
