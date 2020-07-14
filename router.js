var fs = require('fs')
var express = require('express')

// 创建一个路由容器
var router = express.Router()

// 把路由都挂载到 router 路由容器中
// 
// 当服务器收到 get 请求 / 的时候，执行回调处理函数
router.get('/', function(req, res) {
	// res.send('hell express！')
    res.render('index.html', {
        title: '标题',
        content: "登录页"
    }) 
})

// router.get('/login', function(req, res){
// 	res.render('login.html', {
//         title: '标题',
//         content: "登录页"
//     })
// })

// 把 router 导出
module.exports = router