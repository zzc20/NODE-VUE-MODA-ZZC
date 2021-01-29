module.exports = app => {
  // 导入 mongoose web容器
  const mongoose = require("mongoose")
  // (node:14092) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
  // 如果出现上面的错误 官网给出的答案  或者   mongoose.connect(uri, { useFindAndModify: false });
  mongoose.set('useFindAndModify', false)

  // 连接 mongodb 数据库
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {useNewUrlParser: true},
  err => {
    // 连接成功失败方便开发者观看
    if(err) {
      console.log("连接失败")
    }else {
      console.log("连接成功")
    }
  })

}



