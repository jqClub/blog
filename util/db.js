var log = console.log.bind(console)

const MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://127.0.0.1:27017/";
//连接数据库操作
function _connectDB(callback){
    // MongoClient.connect(dburl,{ useNewUrlParser: true }, (err,db)=>{
        MongoClient.connect(dburl,{ useNewUrlParser: true },(err,db)=>{
        callback(err,db);
});
};

//dataName這个是连接的数据库的名字
var dataName = 'vip'
//collection是数据库里表的名字

//查找函数的封装
module.exports.find = function(collection,json){
    var result = [];
    _connectDB(function(err,db){
        if(err){
            console.log('数据库连接失败！');
            return;
        };

        var dbo = db.db(dataName)
        dbo.collection(collection). find(json).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
};

//插入函数的封装
module.exports.insertOne = function(collection,json,callback){
    _connectDB(function(err,db){
        if(err){
            console.log('数据库连接失败！');
            return;
        };
        var dbo = db.db(dataName)
        dbo.collection(collection).insertOne(json,(err,result)=>{
            callback(err,result);
        db.close();
    })
    })
};
//删除函数的封装
module.exports.deleteMany = function(collection,json,callback){
    log(1111, json)
    _connectDB(function(err,db){
        if(err){
            console.log('数据库连接失败！');
            return;
        };
        var dbo = db.db(dataName)
        dbo.collection(collection).deleteMany(json,(err,result)=>{
            callback(err,result);
        db.close();
    });
    });
};
//修改函数的封装
module.exports.updateMany = function(collection,json1,json2,callback){
    log(22222, json1,json2)
    _connectDB(function(err,db){
        if(err){
            console.log('数据库连接失败！');
            return;
        };
        var dbo = db.db(dataName)
        // dbo.collection(collection).updateOne(json1,json2,{upsert: true}, (err,result)=>{
            dbo.collection(collection).updateMany(json1,json2,{upsert: true}, (err,result)=>{
            callback(err,result);
        db.close();
    });
    });
};
//获取集合当中文档的总条数
module.exports.getAllCount = function(collection,callback){
    _connectDB(function(err,db){
        if(err){
            console.log('数据库连接失败！');
            return;
        };
        var dbo = db.db(dataName)
        dbo.collection(collection).count({}).then(function(count){
            callback(count);
            db.close();
        });
    });
};