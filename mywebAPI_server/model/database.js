const path = require("path");
const Sequelize = require("sequelize");

const db = require("./data");

// 批量写入数据
function addData() {
    db.Login.bulkCreate([{
        username: "yyfc",
        password: 329507
    }])
    let birthday1=new Date(720694800000)
    db.Me_information.bulkCreate([{
        nickname: "烟雨凡尘",
        head_url: 'https://img.pengwang.xyz/image/myweb/header.jpg',
        birthday: birthday1,
        six: 0,
        intro: '熟练掌握Web前端开发技术，网站性能优化、SEO和服务器端的基础知识，擅长技术有JavaScript、Vue、jQuery、nodejs以及html5与css3,熟练包括代码的可维护性、组件的易用性、分层语义模板和浏览器分级支持等。'
    }])

    db.Home_message.bulkCreate([{
        message: "有任何技术问题、或者前端开发相关职位推荐，请发送邮件或移步footer栏查看联系方式并联系我！",
    }, {
        message: "技术说明：本站采用vue框架开发，并运用HTML5/CSS3前端技术进行页面开发；使用nodejs搭建服务端并借助mysql数据库来提供数据支撑。",
    }])

    // 我的语录
    db.Me_message.bulkCreate([{
        message: "我，专注。坚持一件事，有始有终。"
    }, {
        message: "我，追新。喜欢探索，期待新鲜事物。。"
    }, {
        message: "我，效率。做事之前，习惯理清思路。"
    }, {
        message: "我，随和。行路有良友，便是捷径。"
    }])

    // 我的项目经验
    db.Me_MyItem.bulkCreate([{
        name: 'Vue后台管理系统',
        src: 'https://img.pengwang.xyz/image/myweb/vue.jpg',
        message: '易用,灵活,高效。;虚拟化DOM的思想，将繁琐的DOM操作变得简单易行。;最重要的一点，它采用双向数据绑定，让我们的开发全心投入到操作数据结构之中，这就是VUE.'
    }, {
        name: '移动端-H5',
        src: 'https://img.pengwang.xyz/image/myweb/h5.png',
        message: 'H5-采用前端最领先的HTML5~CSS3技术以及前端核心语言JavaScript开发的能运行在手机浏览器的网页项目。;在前端的最新版本中，加入了CSS3动画以及HTML5 Canvas等便捷的功能,;并且不再依赖flash插件，这使得H5的运用更为广泛。'
    }, {
        name: '微信小程序',
        src: 'https://img.pengwang.xyz/image/myweb/wechat.png',
        message: '依附于拥有庞大用户量的微信app端，使得小程序的生态圈越来越广泛。;再加上它无需下载，轻便的体验，使得小程序成为社区以及互联网引流的最好选择。'
    }])

    // 我的详细信息
    // db.Me_Detail.bulkCreate([{
    //     name: '烟雨凡尘',
    //     headerImg: 'https://img.pengwang.xyz/image/myweb/vue.jpg',
    //     email: '592394158@qq.com',
    //     tel: 15601646387,
    //     message: '前端开发对于我来说，是乐趣的源泉。从点点滴滴中积累经验，并记录于行，授之于人。这便是我开发并发布博客网站的初衷。从前端到后台，以及UI界面排版，这其中受益良多，也得到了很大的锻炼！'
    // }])

    // 我的项目分类
    db.Project_cate.bulkCreate([{
        // c_id: 1,
        name: '全部',
        btn_icon: 'fa fa-server fa-lg',
    }, {
        // c_id: 1,
        name: 'PC端',
        btn_icon: 'fa fa-television fa-lg',
    }, {
        // c_id: 3,
        name: '移动端',
        btn_icon: 'fa fa-oftablet fa-lg'
    }, {
        // c_id: 4,
        name: '小程序',
        btn_icon: 'fa fa-wechat  fa-lg'
    }, {
        // c_id: 5,
        name: 'APP端',
        btn_icon: 'fa fa-android fa-lg'
    }, {
        // c_id: 6,
        name: '桌面端',
        btn_icon: 'fa fa-windows fa-lg'
    }])

    // 我的项目添加并写入分类关联
    db.Project_list.create({
        name: '全功能APP UI KITS',
        src: 'http://img.pengwang.xyz/image/myweb/112227k9ssyrvoof7sfozk.jpg',
        message: '新鲜时尚的全功能APP UI KITs,集成时尚高端购物，社区推广互动为一体的社交商城',
        addressUrl: '暂无',
        // cateId: '5'
    }).then(async (results) => {
        // console.log(results[0]['dataValues'].id,'new_projectId--------');
        console.log('插入数据--------');
        let res = await db.ProjectCate_relevancy(results, [3])
        console.log(res, '连表结果');
    }).catch();

    db.Project_list.create({
        name: '全功能222',
        src: 'http://img.pengwang.xyz/image/myweb/112227k9ssyrvoof7sfozk.jpg',
        message: '新鲜时尚的全功能APP UI KITs,集成时尚高端购物，社区推广互动为一体的社交商城',
        addressUrl: '暂无',
        // cateId: '5'
    }).then(async (results) => {
        // console.log(results[0]['dataValues'].id,'new_projectId--------');
        console.log('插入数据--------');
        let res = await db.ProjectCate_relevancy(results, [2])
        console.log(res, '连表结果');
    }).catch();

    db.Project_list.create({
        name: '全功能555',
        src: 'http://img.pengwang.xyz/image/myweb/112227k9ssyrvoof7sfozk.jpg',
        message: '新鲜时尚的全功能APP UI KITs,集成时尚高端购物，社区推广互动为一体的社交商城',
        addressUrl: '暂无',
        // cateId: '5'
    }).then(async (results) => {
        // console.log(results[0]['dataValues'].id,'new_projectId--------');
        console.log('插入数据--------');
        let res = await db.ProjectCate_relevancy(results, [5])
        console.log(res, '连表结果');
    }).catch();

    // 我的工作经历
    let time1=new Date(1393603200000)
    let time2=new Date(1496592000000)
    let time3=new Date(1567526400000)
    db.Myjob.bulkCreate([{
        entry_time: time1,
        company_name: '上海铭皋教育科技有限公司',
        job_postName: '前端开发工程师',
        job_message: '负责公司教育培训类前台,后台的PC端以及移动端页面的开发工作;项目采用原生html,css,js以及bootstrap等框架实现功能交互。'
    },{
        entry_time: time2,
        company_name: '上海水杉网络科技有限公司',
        job_postName: '前端开发工程师',
        job_message: '负责公司OA工作流办公协同系统以及前台电商商城的PC端，手机端webApp,小程序等多端独立开发或协同开发;与各部门职能人员紧密合作，优化项目细节，实现最终功能;同后端人员协作，联调商讨接口细节，保证数据及功能的完善;根据需求不断优化迭代公司项目，保证功能的可维护性及兼容性。'
    },{
        entry_time: time3,
        company_name: '武汉力格软件有限公司',
        job_postName: '前端开发工程师',
        job_message: '独立负责公司客总管项目小程序端以及iosAPP端的移植并重构并发布上线;根据月度计划，完成公司对产品新需求的迭代更新工作;完成公司定制客户的小程序端需求迭代更新，并能及时处理实施部对客户反馈的兼容性bug;对公司积极的提出项目上的性能优化以及功能性的bug的问题所在和解决办法。'
    }])

    // 我的技能数据
    db.Skill_echart.bulkCreate([{
        skill_name: 'HTML5/CSS3',
        skill_value: 20,
        skill_percentage: 85,
    },{
        skill_name: 'JavaScript',
        skill_value: 15,
        skill_percentage: 90,
    },{
        skill_name: 'Vue',
        skill_value: 25,
        skill_percentage: 90,
    },{
        skill_name: '小程序',
        skill_value: 30,
        skill_percentage: 95,
    },{
        skill_name: 'NodeJs',
        skill_value: 10,
        skill_percentage: 75,
    }])

    // 我的文章分类
    db.Post_cate.bulkCreate([{
        name: 'JavaScript',
        message: 'JavaScript原生技术文',
    },{
        name: 'HTML5/CSS3',
        message: 'HTML5/CSS3相关前端新特性及开发中遇到的解决方案',
    },{
        name: 'Vue',
        message: 'vue框架开发项目的疑难点',
    },{
        name: '小程序',
        message: '微信小程序开发技术点',
    },{
        name: 'NodeJs',
        message: 'nodejs服务端编程使用心得',
    }])
    // 我的文章添加
    // 我的项目添加并写入分类关联
    db.Post_list.create({
        title: 'nodejs服务器开发教程',
        image: 'http://img.pengwang.xyz/image/myweb/112227k9ssyrvoof7sfozk.jpg',
        message: `修改Windows2012默认占用启动80端口

        Windows Server 2012默认占用启动80端口，有进程system默认启动时占用，其实是system中默认启用的几个服务占用80端口，
        
        解决办法：
        
        1.从cmd中敲入命令net stop http，会有提示使用http服务的其他服务信息：
        
        
        
        C:\Users\Administrator>net stop http
        
        下面的服务依赖于 HTTP Service 服务。
        
        停止 HTTP Service 服务也会停止这些服务。
        
           Windows Remote Management (WS-Management)
        
           Windows Feedback Forwarder Service
        
           World Wide Web Publishing Service
        
           Print Spooler
        
           BranchCache
        
           IIS Admin Service
        
        然后依次关闭几个相关服务，并设置为不自动启动，在进行net stat -ano|find "80"查看是否还有80端口被占用，如果没有了，就可以了。我是关闭了如下几个就ok了。
        
          Windows Feedback Forwarder Service 
        
           Print Spooler
        
           BranchCache 
        
        其中iis服务，已经改为非80的其他端口，所以iis可以继续正常使用。`,
        give_likeNum: 1,
        pageview: 1000
        // cateId: '5'
    })
    .then(async (newPost) => {
        // console.log(results[0]['dataValues'].id,'new_projectId--------');
        console.log(newPost,'插入文章--------');

        
        let res = await db.PostCate_relevancy(newPost, [5])
        console.log(res, '添加结果');
    }).catch();
}
db.initialiseDatabase(true, addData);