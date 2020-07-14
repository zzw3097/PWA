
// 缓存的名字
const CACHE_NAME = 'cache_V1' 

// 主要就是缓存内容
self.addEventListener('install', async event => {
    // console.log('install', event)
    // 开启一个cache 得到一个cache对象 缓存所有的静态资源
    const cache = await caches.open(CACHE_NAME)
    // cache 对象就可以存储资源
    // 等待cache把所有的资源存储起来 存储所有的静态资源
    await cache.addAll([
        '/',
        'manifest.json',
        'sw.js'
        
    ])
    // 会让service worker 跳过等待 直接进入到activate状态
    // 跳过等待事件
    await self.skipWaiting()
})

// 主要就是清除缓存
self.addEventListener('activate', async event => {
    // console.log('activate', event)
    // 会清除掉旧的资源 先获取到所有资源的key
    const keys = await caches.keys()
    
    keys.forEach(key => {
        if(key !== CACHE_NAME){
            caches.delete(key)
        }
    })
    // 表示service worker激活后 立即获取控制权
    await self.clients.claim()
})

// 主要就是控制缓存
self.addEventListener('fetch', event => {
    // fetch事件会在请求发送的时候触发
    // console.log('fecth', event)
    // 判断资源就否能够请求成功 如果能成功就响应成功结果， 不成功，就读取caches缓存
    // 获取请求对象
    const req = event.request
    const url = new URL(req.url)
    // 校验同域下
    if (url.origin !== self.origin) {
        return
    }

    if (req.url.includes('/api')) {
        event.respondWith(networkFirst(req))
    } else {
        event.respondWith(cacheFirst(req))
    }
    // 给浏览器响应
    
})

// 网络优先
async function networkFirst(req){
    const cache = await caches.open(CACHE_NAME)
    // 缓存处理
     try{
        // 先从网络读取资源
        const fresh = await fetch(req)
        // 把响应的备份存储在缓存中
        cache.put(req, fresh.clone())
        // 把最新的响应返回给浏览器 
        return fresh
     }catch(e){
        //如果fetch失败，从缓存读取
        
        const cached = await cache.match(req)
        return cached
     }
}

// cache 缓存优先
async function cacheFirst(req){
    const cache = await caches.open(CACHE_NAME)
    const cached = await cache.match(req)
    // 如果从缓存中得到了数据
    if(cached){
        return cached
    }else{
    // 读网络
        const fresh = await fetch(req)
        return fresh
    }
}