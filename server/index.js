// const http = require('http');
// const userApi = require('./api/userApi');
// // const fs = require('fs');
// // const path = require('path');
// const bodyParser = require('body-parser');
// const express = require('express');
// let app = express();
// let server = http.createServer(app);
//
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
//
// // 后端api路由
// app.use('/api/user', userApi);
//
// // 监听端口
// app.listen(3000);
// console.log('success listen at port:3000......');
//创建服务器
//第一个引入express框架
const express = require('express')
//第二 把express 方法付给app
const app = express()
//创建一个接口，当用户访问'/'
app.get('/',(req,res)=>{
    res.send('当前服务器已连接')
})
app.get('/foodList',(req,res)=>{
    const json = [
        {
            id:1,
            name:'海底捞'
        },
        {
            id:2,
            name:'水煮鱼'
        },
        {
            id:3,
            name:'烧烤'
        },
    ]
    console.log("send json")
    res.send(json)
})

//第三步监听我的端口
app.listen(3000)
console.log('success listen at port:3000......');
