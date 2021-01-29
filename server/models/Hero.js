// 导入mongoose web容器
const mongoose = require('mongoose')

// 添加一个字段 name
const schema = new mongoose.Schema({
  // 英雄的名字 比如后裔
  name: {type: String},
  // 英雄的头像
  avatar: {type: String},
  // 英雄的称号  比如后裔有称号 半身之弓
  title: {type: String},
  // 关联的分类 是战士 还是射手 还是法师 还是坦克 还是刺客  
  // 可能是法师也是刺客 所以有可能是一对多 用 [] 将对象包起来
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  // 难度
  scores: {
    // 一开始定义为String  但是与后台el-rate类型Number不匹配所以 后来改为 Number 后台不报错
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number}
  },
  // 技能
  skills: [{
    icon: {type: String},
    name: {type: String},
    description: {type: String},
    tips: {type: String}
  }],
  // 逆风出装推荐 
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  // 顺风出装推荐
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  // 使用简介
  usageTips: {type: String},
  // 对战提示
  battleTips: {type: String},
  // 队伍推荐
  teamTips: {type: String},
  // 英雄同伴推荐
  partners: [{
    hero: {type: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {type: String}
  }]
})

// 英雄
// 将这个model导出 
module.exports = mongoose.model('Hero', schema)

