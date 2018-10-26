// Models/users.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var userSchema = new Schema({
    username: String,
    email: String,
    blog_id: Number,
    created_time: String,
    id: Number,
});
// 将数据模型暴露出去
// module.exports = mongoose.model('name', userSchema);
//下面的可以再创建的时候，surface不自动带上s
// surface是选择写入那个表
// 這里可以选择操作不同的表
var result = {
    'name': mongoose.model('Page', userSchema, 'name'),
}
module.exports = result