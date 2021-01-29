// 导入mongoose web容器
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// 添加一个字段 name
const schema = new mongoose.Schema({
  // 文章的名字 比如后裔
  username: {type: String},
  // 密码不可见 使用 散列加密密码 不可逆
  password: {type: String, 
    select: false, 
    set(val) {
      return bcrypt.hashSync(val, 10)}
    }
  
})

// 英雄
// 将这个model导出 
module.exports = mongoose.model('AdminUser', schema)