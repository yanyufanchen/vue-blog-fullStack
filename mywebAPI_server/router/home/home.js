// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");

// 获取home底部栏技术描述
router.get("/", function(req, res) {
    db.Home_message.findAll({raw: true}).then(function(results) {
        ret.json({results:results,mes:'查询成功',flag:true}, res);
    });
  });
  //message: String
  router.post("/", function(req, res) {
    // 此处要做拦截
    console.log(req,'获取参数');
    if(!req.body.message||req.body.message==''){
      let err="传参有误/传参不能为空"
      ret.json([], res,err);
      return
    }
    db.Home_message.create({
        message: req.body.message,
    }).then(function(results) {
      ret.json({results:results,mes:'添加成功',flag:false}, res);
    });
  });

module.exports = router