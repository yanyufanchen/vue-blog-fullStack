// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");
let Sequelize = require('sequelize');
// 获取我的项目列表----data{cata_id: 2}
router.post("/get_projectList", async (req, res)=> {
  console.log(req,'传值');
  if(!req.body.cate_id){
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  let project=[]
  if(req.body.cate_id==1){
    project=await db.Project_list.findAll({
      include: [{
        model: db.Project_cate
      }],
      raw: false
    })
  }else {
    project=await db.Project_list.findAll({
      include: [{
        model: db.Project_cate
      }],
      where: {'$project_cates.id$': req.body.cate_id},
      raw: false
    })
  }
  
  console.log(project,'全部项目');
  
  ret.json({
    results: project,
    mes: '查询成功',
    flag: true
  }, res);

});

// 添加我的项目--需要传入项目分类id----data{name:String ,src: String,message: String,addressUrl: String,cate_id: 2}
router.post("/add_projectList", async (req, res)=> {
  // 此处要做拦截
  console.log(req, '获取参数');
  if (!req.body.message || req.body.message == '' || !req.body.cate_id ||req.body.cate_id=='' || !req.body.addressUrl || req.body.addressUrl == '') {
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  let newPost=await db.Project_list.create({
    name: req.body.name,
    src: req.body.src,
    message: req.body.message,
    addressUrl: req.body.addressUrl,

  })
  console.log('插入数据--------');
    let data = await db.ProjectCate_relevancy(newPost, req.body.cate_id)
    console.log(data, '连表结果');

    ret.json({
      results: '',
      mes: '添加成功',
      flag: false
    }, res);
});

// 获取我的分类列表
router.get("/get_projectCate", function (req, res) {
  db.Project_cate.findAll({
    raw: true
  }).then(function (results) {
    console.log(results, 11111);
    ret.json({
      results: results,
      mes: '查询成功',
      flag: true
    }, res);
  });
});

// 添加我的项目分类--方法已做了重复拦截---data{name:String ,btn_icon: String}
router.post("/add_projectCate", function (req, res) {
  // 此处要做拦截
  console.log(req, '获取参数');
  if (!req.body.name || req.body.name == '' || !req.body.btn_icon || req.body.btn_icon == '') {
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  db.Project_cate.findCreateFind({
    where: {
      name: req.body.name,
      btn_icon: req.body.btn_icon
    }
  }).then(async results => {
    if (!results[1]) return ret.json({
      results: results,
      mes: '不允许重复',
      flag: false
    }, res);
    ret.json({
      results: results,
      mes: '添加成功',
      flag: false
    }, res);
  })
});

module.exports = router