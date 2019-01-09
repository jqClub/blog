var log = console.log.bind(console)
// 19.1.9新增——用来请求接口，并写入json文件
var fs = require('fs')

var request = require('request');

var blogFilePath = 'db/apiData.json'

// 这是一个用来存储 Blog 数据的对象
const ModelBlog = function(form) {
    // || 是一种新的写法, 在 js 圈子里太过流行, 所以记住即可
    // a = b || c 意思是如果 b 是 undefined 或者 null
    // 就把 c 赋值给 a
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    // 生成一个 unix 时间, unix 时间是什么, 上课会说
    this.created_time = Math.floor(new Date() / 1000)
}

const loadBlogs = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

/*
 b 这个对象是我们要导出给别的代码用的对象
 它有一个 data 属性用来存储所有的 blogs 对象
 它有 all 方法返回一个包含所有 blog 的数组
 它有 new 方法来在数据中插入一个新的 blog 并且返回
 他有 save 方法来保存更改到文件中
 */
var b = {
    data: loadBlogs()
}

var url = 'https://app.unjs.com/app_phpv2/newyearlot/index.php?act=xncq&app=xncq&t=2'
//设置需请求的次数
var time = 100
//初始请求的index（从1请求到到100）
var index = 1
var result = b.data  //所有的结果
var ids = []  //所有的id（如果不存在，才写入result）
var getIds = function() {
    for(var i = 0; i < result.length; i++) {
        var id = result[i].id
        ids.push(id)
    }
}
getIds()
//思路：1.循环去请求，成功index+1，然后在回调里去执行下一次请求
// 2.先用一个数组全部存起来
// 3.写入json文件

b.new = function() {
    log(index)
    var that = this
    //超过上限，不去请求
    if(index > time) {
        that.data = result
        // 把 最新数据 保存到文件中
        that.save()
        return
    }

    getAjax({
        url,
        successFun: function(body) {
            var errno = body.errno
            if(errno == 0) {
                //    说明请求成功了
                var list = body.list
                if(ids.indexOf(list.id) > -1) {
                    index += 1
                    that.new()
                    return
                }
                //存到结果里面去
                ids.push(list.id)
                result.push(list)

                index += 1
                that.new()
            }
        },
    })
}


b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(blogFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
    }
})
}


//写2个请求,get和post请求
//参考：https://blog.csdn.net/dreamer2020/article/details/52074516
//https://www.jianshu.com/p/a156729ce499
var getAjax = function(obj) {
    request(obj.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Show the HTML for the baidu homepage.
            body = JSON.parse(body)  //这里返回的是string，所以需要先转对象
            if(typeof obj.successFun == 'function') {
                obj.successFun(body)
            }
        }
    })
}

var postAjax = function(obj) {
    request({
        url: obj.url,
        method: "POST",
        // json: true,
        json: obj.data,
        headers: {
            "content-type": "application/json",
        },
        // body: JSON.stringify(obj.data)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            if(typeof obj.successFun == 'function') {
                obj.successFun(body)
            }
        }
    });
}
//例子
// postAjax({
//     url: 'https://easy-mock.com/mock/5c05f3b4119ec9640d826f40/example/upload',
//     data: {
//         "a": "1"
//     },
//     successFun: function(body) {
//         log(body.data)
//     },
// })

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b