// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");
let Sequelize = require('sequelize');
// 获取我的文章列表----data{cata_id: 2}
router.post("/get_postList", async (req, res)=> {
  console.log(req,'传值');
  if(!req.body.cate_id&&req.body.cate_id!==0){
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  let post=[]
  let include=[]
  // if(req.body.limit&&req.body.offset){
  //   include=[{
  //     model: db.Post_cate,

  //   }]
  // }
  post=await db.Post_list.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [{
      model: db.Post_cate
    }],
    limit: req.body.limit?req.body.limit:1000000,
    offset: req.body.offset?req.body.offset:0,
    where: req.body.cate_id==0?{}:{'$post_cates.id$': req.body.cate_id},
    raw: false
  })
  
  console.log(post,'全部文章');
  
  ret.json({
    results: post,
    mes: '查询成功',
    flag: true
  }, res);

});
// 获取我的指定文章----data{post_id: 2}
router.get("/get_postItem", async (req, res)=> {
  console.log(req.query,'传值');
  if(!req.query.post_id&&req.query.post_id!==0){
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  let post=[]
  // if(req.body.limit&&req.body.offset){
  //   include=[{
  //     model: db.Post_cate,

  //   }]
  // }
  post=await db.Post_list.findAll({
    include: [{
      model: db.Post_cate
    }],
    where: {
      id: req.query.post_id
    }
  });
  
  console.log(post,'指定文章');
  
  ret.json({
    results: post,
    mes: '查询成功',
    flag: true
  }, res);

});
// 添加我的项目--需要传入项目分类id----data{title:String ,image: String,message: String,give_likeNum: number,pageview: number,cate_id:1}
router.post("/add_post", function (req, res) {
  // 此处要做拦截
  console.log(req, '获取参数');
  if (!req.body.title || req.body.title == '' ||!req.body.image || req.body.image == '' ||!req.body.message || req.body.message == ''|| !req.body.cate_id ||req.body.cate_id=='') {
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  db.Post_list.create({
    title: req.body.title,
    image: req.body.image,
    message: req.body.message,
    cate_id: req.body.cate_id,
    give_likeNum: 1,
    pageview: 100

  }).then(async (results) => {
    console.log('插入数据--------');
    let data = await db.PostCate_relevancy(results, req.body.cate_id)
    console.log(data, '连表结果');
    ret.json({
      results: results,
      mes: '添加成功',
      flag: false
    }, res);
  });
});

// 获取我的文章分类列表
router.get("/get_postCate", function (req, res) {
  db.Post_cate.findAll({
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

// 添加我的文章分类--方法已做了重复拦截---data{name:String ,message: String}
router.post("/add_postCate", function (req, res) {
  // 此处要做拦截
  console.log(req, '获取参数');
  if (!req.body.name || req.body.name == '' || !req.body.message || req.body.message == '') {
    let err = "传参有误/传参不能为空"
    ret.json([], res, err);
    return
  }
  db.Post_cate.findCreateFind({
    where: {
      name: req.body.name,
      message: req.body.message
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