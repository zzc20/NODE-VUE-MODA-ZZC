module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  
  // const AdminUser = require('../../models/AdminUser')
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
  router.get('/', 
  async (req, res, next) => {

    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '密码不对')

    const {id} = jwt.verify(token, app.get('secret'))
    assert(id, 401, '密码不对')

    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '密码不对')

    await next()
  },
  
  async (req, res) => {
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

    // 因为之前进行代码没查询密码 现在要把密码加上
    const user = await AdminUser.findOne({ username }).select('+password')
    
    // 判断用户名是否存在
    assert(user, 401, '用户不存在') 
    // if(!user) {
    //   res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }  
    // 2、校验 此处要引用 bcrypt 进行密码的校验 
    // compareSync(客户端发过来的明文密码, 查询出来的密码) 
    const isValid = require('bcrypt').compareSync(password, user.password)
    // 判断是否匹配
    assert(isValid, 422, '密码错误')
    // if(!isValid) {
    //   res.status(422).send({
    //     message: '密码错误'
    //   })
    // }

    // 3、生成token值返回到客户端
    
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({token})

  })

  // app.use('/admin/api', router)
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}
