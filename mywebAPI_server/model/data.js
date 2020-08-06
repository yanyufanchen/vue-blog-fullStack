let Sequelize = require('sequelize');
let sequelize = require('../db');
// connect to the database
sequelize.authenticate().then(
  function () {
    console.log("连接成功.");
  },
  function (err) {
    console.log("连接失败:", err);
  }
);


// 建表类型
// Home_message---home栏底部技术描述-------------------------------------
const Home_message = sequelize.define("home_message", {
  message: Sequelize.STRING,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 账号密码--------------------------------------------------
const Login = sequelize.define("login", {
  username: Sequelize.STRING,
  password: Sequelize.BIGINT,
  rank: Sequelize.BIGINT, // 级别
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 我的资料--------------------------------------------------
const Me_information = sequelize.define("me_information", {
  nickname: Sequelize.STRING,
  head_url: Sequelize.STRING,
  birthday: Sequelize.DATE,
  six: Sequelize.BIGINT, // 0 男 1 女
  intro: Sequelize.STRING, // 简介
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 关于我---me我的语录--------------------------------------------------
const Me_message = sequelize.define("me_message", {
  message: Sequelize.STRING,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})

// 我的项目---列表---------------------------------------------------
const Project_list = sequelize.define("project_list", {
  name: Sequelize.STRING,
  src: Sequelize.STRING,
  message: Sequelize.STRING,
  addressUrl: Sequelize.STRING,
  // cate_id: Sequelize.STRING
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 我的项目---分类-------------------------------------------------
const Project_cate = sequelize.define("project_cate", {
  // cate_id: Sequelize.STRING,
  name: Sequelize.STRING,
  btn_icon: Sequelize.STRING
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 项目分类关联
const Projects_cates = sequelize.define("projects_cates", {
  project_id: Sequelize.STRING,
  cate_id: Sequelize.STRING,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// Projects_cates.sync({
//   force: false
// })

Project_list.belongsToMany(Project_cate, {
  through: "projects_cates",
  foreignKey: 'project_id',
  constraints: false
});
Project_cate.belongsToMany(Project_list, {
  through: "projects_cates",
  foreignKey: 'cate_id',
  constraints: false
});
// 自动写入项目分类和项目关联函数
const ProjectCate_relevancy = async (results, cate_id) => {
  let project = results;
  let cate = await Project_cate.findAll({
    where: {
      id: cate_id
    }
  })
  console.log(cate, '查找对象');
  let res = project.setProject_cates(cate)
  return res
}

// 我的工作经历----------------------------------------------
const Myjob = sequelize.define("live_job", {
  // entry_time: Sequelize.BIGINT,
  entry_time: Sequelize.DATE,
  company_name: Sequelize.STRING,
  job_postName: Sequelize.STRING,
  job_message: Sequelize.TEXT,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})

// 我的技能数据----------------------------------------------
const Skill_echart = sequelize.define("skill_echart", {
  skill_name: Sequelize.STRING,
  skill_value: Sequelize.BIGINT,
  skill_percentage: Sequelize.BIGINT
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})


// 我的文章---列表---------------------------------------------------
const Post_list = sequelize.define("post_list", {
  title: Sequelize.STRING,
  image: Sequelize.STRING,
  message: Sequelize.TEXT,
  give_likeNum: Sequelize.INTEGER,
  pageview: Sequelize.INTEGER
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 我的文章---分类-------------------------------------------------
const Post_cate = sequelize.define("post_cate", {
  name: Sequelize.STRING,
  message: Sequelize.TEXT
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// 文章分类关联
const Posts_cates = sequelize.define("posts_cates", {
  post_id: Sequelize.STRING,
  cate_id: Sequelize.STRING,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})
// Projects_cates.sync({
//   force: false
// })

Post_list.belongsToMany(Post_cate, {
  through: "posts_cates",
  foreignKey: 'post_id',
  constraints: false
});
Post_cate.belongsToMany(Post_list, {
  through: "posts_cates",
  foreignKey: 'cate_id',
  constraints: false
});
// 自动写入项目分类和项目关联函数
const PostCate_relevancy = async (results, cate_id) => {
  let post = results;
  let cate = await Post_cate.findAll({
    where: {
      id: cate_id
    }
  })
  console.log(results, '对象');
  console.log(cate, '查找对象');
  let res = results.setPost_cates(cate)
  return res
}




//  SYNC SCHEMA 同步模型
const initialiseDatabase = function (wipeAndClear, repopulate) {
  sequelize.sync({
    force: wipeAndClear
  }).then(
    function () {
      console.log("数据同步");
      if (repopulate) {
        repopulate();
      }
    },
    function (err) {
      console.log("创建表出错:", err);
    }
  );
};

module.exports = {
  initialiseDatabase,
  Home_message,
  Login,
  Me_information,
  Me_message,
  Project_list,
  Project_cate,
  ProjectCate_relevancy,
  Myjob,
  Skill_echart,
  Post_list,
  Post_cate,
  PostCate_relevancy,
}