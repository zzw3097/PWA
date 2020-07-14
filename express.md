# Express

```shell
# http://expressjs.com/
```

## 安装

```js
npm i express -S
```

## 引包

```js
const express = require('express')
```

## 创建应用

```js
const app = express()
```

## 基本路由

#### get:

```js
app.get('/', function(req,res){
    // req.query 来获取参数
    res.send('Hello World!')
})
```

#### post:

```js
app.post('/', function(req,res){
    # 安装 express 中间件： npm install body-parser -S 
    # 引用 const bodyParser = require('body-parser')
    # 配置 app.use(bodyParser.urlencoded({ extended: false }))
    # 配置 app.use(bodyParser.json())
    # 配置后，在 req 请求对象上多出一个属性：body
    # 则通过 req.body 来获取表单 POST 请求体数据
    res.send('Got a POST request!')
})
```

## 静态服务

```js
app.use(express.static('./public/'))
app.use('/public/', express.static('./public/'))
app.use('/public', express.static(pach.join(__dirname, 'public')))
```

## 在 Express 中配置使用 art-template 模板引擎

### 安装

```js
npm install -save art-template express-art-template
```

### 配置

```js
# art 当渲染以 .art 结尾的文件 使用art-template 模板引擎
# express-art-template 包，依赖 art-template
app.engine('art', require('express-art-template'))
```

### 使用

```js
# Express 为 Response 相应对象提供了一个方法： render
# res.render('html模板名.art', {模板数据})
# .art 会默认在 views 目录内查找. 使用 app.set('views', 目录) 变更视图渲染目录
app.get('/', function(req, res){
    res.render('html.art', {
        title: '标题'
    })
})
```



