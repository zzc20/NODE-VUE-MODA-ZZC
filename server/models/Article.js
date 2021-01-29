// 导入mongoose web容器
const mongoose = require('mongoose')

// 添加一个字段 name
const schema = new mongoose.Schema({
  // 文章的名字 比如后裔
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  area: {type: String}
})

// 英雄
// 将这个model导出 
module.exports = mongoose.model('Article', schema)

