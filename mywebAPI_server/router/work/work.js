// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");

// 获取我的项目列表
router.get("/get_Myjob", function (req, res) {
    db.Myjob.findAll({
        'order': [['id', 'DESC']],
        raw: true
    }).then(function (results) {
        ret.json({
            results: results,
            mes: '查询成功',
            flag: true
        }, res);
    });
});

// 添加我的项目--需要传入项目分类id----data{entry_time:Number ,company_name: String,job_postName: String,job_message: String}
router.post("/add_Myjob", function (req, res) {
    // 此处要做拦截
    console.log(req, '获取参数');
    if (!req.body.entry_time || req.body.message == '' || !req.body.company_name || req.body.company_name == '' || !req.body.job_postName || req.body.job_postName == '' || !req.body.job_message || req.body.job_message == '') {
        let err = "传参有误/传参不能为空"
        ret.json([], res, err);
        return
    }
    db.Myjob.create({
        entry_time: req.body.entry_time,
        company_name: req.body.company_name,
        job_postName: req.body.job_postName,
        job_message: req.body.job_message,
    }).then(async (results) => {
        ret.json({
            results: results,
            mes: '添加成功',
            flag: false
        }, res);
    });
});



module.exports = router