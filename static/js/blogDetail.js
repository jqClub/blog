var log = console.log.bind(console)
var ajax = function(request) {
    /*
     request 是一个 object, 有如下属性
     method, 请求的方法, string
     url, 请求的路径, string
     data, 请求发送的数据, 如果是 GET 方法则没这个值, string
     callback, 响应回调, function
     */
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}
var blogOne = function(id) {
    var request = {
        method: 'GET',
        url: '/api/blog/' + id,
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况(断网/服务器返回错误等等)
            var b = JSON.parse(response)
            log('博客详细数据', b)
            insertBlogContent(b)
            insertBlogContentP(b)
        }
    }
    ajax(request)
}
// 播客内容 html
var blogTemplate = function(blog) {
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var content = blog.content
    var t = `
    <div class="blog-details-main">
        <h3 class="blog-details-title">${title}</h3>
        <div class="blog-details-introduce">
            <span class="blogsep">时间：${time}</span></br>
            <span class="author">作者：${author}</span>
        </div>
        <p class="blog-details-content">${content}</p>
    </div>
    `
    return t
}
// 播客评论 html
var blogTemplateP = function(blog) {
    var id = blog.id
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var content = blog.content
    var t = `
    <div class="comment-Podcast">
        <p>评论${id}：</p>
        <span class="comment-Podcast-introduce">
            <span class="blogsep">${time}</span>
            <span class="author">${author}</span>
        </span>
        <p>${content}</p>
    </div>
    `
    return t
}
// 插入播客内容
var insertBlogContent = function(blog) {
    log('in insertBlogContent')
    var html = blogTemplate(blog)
    var div = document.querySelector('.blog-details')
    div.insertAdjacentHTML('beforeend', html)
}
// 评论
var insertBlogContentP = function(blog) {
    var html = ''
    var comments = blog.comments
    for (var i = 0; i < comments.length; i++) {
        var b = comments[i]
        log('b', b)
        var t = blogTemplateP(b)
        html += t
    }
    // 把数据写入 .blog-details 中, 直接用覆盖式写入
    var div = document.querySelector('.blog-details')
    div.insertAdjacentHTML('beforeend', html)
}

var __main = function () {
    var blogId = document.body.dataset.id
    blogOne(blogId)
    // 载入博客列表
}
__main()
