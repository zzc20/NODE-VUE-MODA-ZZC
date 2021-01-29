const express = require('express')

const app = express()

// 中间件
app.use(require('cors')())
app.use(express.json())

// 静态路径托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)

// 3000端口号
app.listen(3000, ()=> {
  console.log("http://localhost:3000")
})

  