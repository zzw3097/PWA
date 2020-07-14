// 0. 安装
// 1. 引包
const express = require('express')
// 路由模块
const router = require('./router')
// 2. 创建服务器应用程序 也就是原来的 http.createServer
const app = express()
 
// 公开指定目录 通过 /public/xxx 访问 public 目录中的所有资源
app.use(express.static(__dirname + '/public'))


// 配置模板引擎
app.engine('html', require('express-art-template'))

// 把路由容器挂载到 app 服务中
app.use(router)




// 相当于 server.listen
app.listen(3000, function(){
	console.log('app is running at port: 3000')
})