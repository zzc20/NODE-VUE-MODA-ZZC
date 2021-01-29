module.exports = app => {
  const express = require('express')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })
  // const Category = require('../../models/Category')
  // 通用接口插入操作
  router.post('/', async (req, res) => {

    // const modelName = require(`../../models/${req.params.resource}`)
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 通用接口查询操作
  router.get('/', async (req, res) => {
    const queryOptions = {}
    // if(req.Model.modelName === 'Category'){
    //   queryOptions.populate = 'parent'
    // }
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // .limit(10) 限制展现的行数
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  // 通用接口根据id查询操作
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 通用接口根据id修改操作
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 通用接口删除操作
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send(
      {success: '删除成功'}
    )
  })

  // 上传文件图片
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}` // 相当于文件路径
    res.send(file)
  })

  // 登录操作
  app.post('/admin/api/login', async (req, res) => {
    // 1、接收前端页面用户输入的用户名 密码
    const {username, password} = req.body;

    const adminUser = AdminUser.findOne({username})
    if(!adminUser) {
      res.status('422').send('用户不存在')
    }
    // 2、校验
    // req.Model.find
    

  })

  // app.use('/admin/api', router)
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

}