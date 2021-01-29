// 导入mongoose web容器
const mongoose = require('mongoose')

// 添加一个字段 name
const schema = new mongoose.Schema({
  name: {type: String},
  icon: {type: String}
})
// 装备
// 将这个model导出 
module.exports = mongoose.model('Item', schema)

