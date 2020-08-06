// 这是 数据操作模块，只负责 获取数据库连接对象
// 数据库表名
// author-------作者表（管理作者信息和登录账号密码）
// banner_img-------首页轮播图
// comment-------评论管理表（关联读者和文章）
// home_message-------主页底部描述
// live_undergo-------工作经历表
// login-------待定
// me_capacity-------关于我--页面展示擅长项目种类
// me_message-------关于我--页面展示banner主描述
// post-------文章表（关联作者和文章分类）
// post_cate-------文章分类表
// project_list-------项目表(关联项目分类)
// project_cate-------项目分类表
// reader-------读者表
// skill_echart-------开发技能图表数据暂时表

// // 导入 mysql 模块
// const mysql = require('mysql')
// // 创建数据库连接
// const conn = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'root',
//   database: 'my_blog',
//   // 执行多条sql语句
//   multipleStatements: true
// })

// 创建sequelize对象
// 在代码顶部先要把sequelize库require进来。
// 第一个参数'test1' 是数据库名。
// 第二个参数'root'是登录用户名。
// 第三个参数'123456'是登录用户对应的密码。
// 第四个参数：
// host：数据库主机地址
// dialect：'mysql'|'sqlite'|'postgres'|'mssql'
let Sequelize=require('sequelize')
module.exports=new Sequelize('wangpeng','root','root',{
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: '+08:00',  // 等同于 postgres 的 `set timezone = 'xxx'
  pool: {
    max: 5,  // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  }
})
