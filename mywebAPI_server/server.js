// 项目启动 supervisor ./server.js
const express = require('express')
const app = express()
const api = require("./model/data");
// 在 API 服务器端，启用 CORS 跨域资源共享
const cors = require('cors')
app.use(cors())
// allow CORS preflight for all routes
app.options("*", cors());
// 解析请求体
app.use(express.json());
// 解码查询 interpret url-encoded queries
app.use(express.urlencoded({ extended: false }));
// // // 注册 body-parser 中间件
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());//数据格式化


let homeRouter = require("./router/home/home");
app.use("/home", homeRouter);
let MeRouter = require("./router/about_me/about_me");
app.use("/about_me", MeRouter);
let LoginRouter = require("./router/about_me/login");
app.use("/", LoginRouter);
let ProjectRouter = require("./router/project/project");
app.use("/project", ProjectRouter);
let MyJobRouter = require("./router/work/work");
app.use("/work", MyJobRouter);
let SkillEchartRouter = require("./router/skill/skill");
app.use("/skill", SkillEchartRouter);
let PostRouter = require("./router/post/post");
app.use("/post", PostRouter);

// 错误处理 handle errors last
app.use(function(err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});





// connect to the database and start the server running
// api.initialiseDatabase(false, null);
// 让 后端项目，运行在 5001 端口
app.listen(9091, () => {
    console.log('api server running at http://127.0.0.1:9091')
})