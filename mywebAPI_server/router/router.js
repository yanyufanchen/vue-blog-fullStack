// 公共路由
// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require('express')
const router = express.Router()

// 导入自己的 业务逻辑处理模块
const ctrl = require('../controller/controller.js')
// 只要有人请求 后台的 / 根路径地址，就提示他，请求API服务器成功了！
router.get('/', ctrl.testAPI)

// 抛出
module.exports = router