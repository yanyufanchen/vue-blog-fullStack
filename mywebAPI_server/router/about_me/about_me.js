// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");

// -------------我的语录-------------------------
// 获取我的语录
router.get("/get_message", function (req, res) {
  db.Me_message.findAll({
    raw: true
  }).then(function (results) {
    ret.json({
      results: results,
      mes: '查询成功',
      flag: true
    }, res);
  });
});
// 添加我的语录
//message: String
router.post("/add_message", function (req, res) {
  // 此处要做拦截
  console.log(req, '获取参数');
  if (!req.body.message || req.body.message == '') {
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  db.Me_message.create({
    message: req.body.message,
  }).then(function (me_messages) {
    ret.json({
      results: results,
      mes: '添加成功',
      flag: false
    }, res);
  });
});


// -------------我的基本信息------------------------
// 获取我的基本信息
router.get("/get_Me_information", function (req, res) {
  db.Me_information.findAll({
    raw: true
  }).then(function (results) {
    ret.json({
      results: results,
      mes: '查询成功',
      flag: true
    }, res);
  });
});

module.exports = router