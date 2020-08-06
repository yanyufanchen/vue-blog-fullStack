// 路由模块  本质：就是 URL 地址到 处理函数之间的对应关系
const express = require("express");
const router = express.Router();
const db = require('../../model/data');
const ret = require("../../lib/return");

router.get("/login", async (req, res) => {
  console.log(req.query, '传值');
  // if (!req.query.post_id && req.query.post_id !== 0) {
  //   let err = "传参有误/传参不能为空"
  //   ret.json([], res, err);
  //   return
  // }
  let post = []
  // if(req.body.limit&&req.body.offset){
  //   include=[{
  //     model: db.Post_cate,

  //   }]
  // }
  post = await db.Post_list.findAll({
    include: [{
      model: db.Post_cate
    }],
    where: {
      id: req.query.post_id
    }
  });

  console.log(post, '指定文章');

  ret.json({
    results: post,
    mes: '查询成功',
    flag: true
  }, res);

});

//username: String ,password: number
router.post("/login", async (req, res) => {
  // 此处要做拦截
  console.log(req, '获取参数');
  console.log(req.body.username, '获取参数');
  if (!req.body.username || req.body.username == '' || !req.body.password || req.body.password == '') {
    let err = "账号/密码不能为空"
    ret.json([], res, err);
    return
  }
  let login = []
  login = await db.Login.findAll({
    where: {
      username: String(req.body.username)
    }
  })
  console.log(login, '登录');
  if(login.length==0){
    ret.json([], res, '账号不存在');
  }
  // 生成随机字符串
  function randomString(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    const token=randomString(32)
  if(Number(req.body.password)!==login[0].dataValues.password){
    console.log('账号/密码错误')
    ret.json([], res, '账号/密码错误');
  }else{
    console.log('登录成功')
    ret.json({
      results: {
        token: token
      },
      mes: '登录成功',
      flag: true
    }, res)
  }
  
});

module.exports = router