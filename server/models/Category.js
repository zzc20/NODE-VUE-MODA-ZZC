// 导入mongoose web容器
const mongoose = require('mongoose')

// 添加一个字段 name
const schema = new mongoose.Schema({
  name: {type: String},
  parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

// 分类
// 将这个model导出                也就是表名   表结构
module.exports = mongoose.model('Category', schema)

