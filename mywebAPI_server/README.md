# myweb_Server

## 1、Project setup

安装环境

```
1、node js
2、$ npm install --save sequelize
3、$ npm install --save mysql
```



安装依赖包

```
npm install
```

启动phpstudy2018

```
运行数据库服务
```

初始化数据库

```
node ./model/database.js
```

项目启动

```
supervisor .\server.js 
```

## 2、后台API

#### 2.1、根目录

```
http://127.0.0.1:9091
```

#### 2.2、home栏技术描述  

路径：/home--

##### 2.2.1、首页信息home_message

查询全部

```
get: /
```

新增

```
post: /
{
  message: '大神兑换接口'
}
```

#### 2.3、about_me栏

 路径：/about_me--

##### 2.3.1、个人语录 me_message

查询全部

```
get: /get_message
```

新增

```
post: /add_message
{
  message: '大神兑换接口'
}
```

##### 2.3.2、我的详细信息 get_Me_information

查询全部

```
get: /get_MyDetail
```

#### 

#### 2.4、project栏

 路径：/project--

##### 2.4.1、我的项目

查询指定分类的项目列表

```
post: /get_projectList
{cate_id：1 //1代表查询全部   }
```

新增

```
post: /add_projectList
{
        name: '全功能APP UI KITS',
        src: 'http://img.pengwang.xyz/image/myweb/112227k9ssyrvoof7sfozk.jpg',
        message: '新鲜时尚的全功能APP UI KITs,集成时尚高端购物，社区推广互动为一体的社交商城',
        addressUrl: '暂无',
        // cateId: '5'
    }
```

##### 2.4.2、我的项目分类

查询全部分类

```
get: /get_projectCate
```

新增

```
post: /add_projectCate
{
        // c_id: 1,
        name: '全部',
        btn_icon: 'fa fa-server fa-lg',
    }
```

#### 2.5、skill栏

 路径：/skill--

##### 2.5.1、我的技能数据

查询全部

```
get: /get_skillEchart
```

新增

```
post: /add_skillEchart
{
        skill_name: 'HTML5/CSS3',
        skill_value: 20,
        skill_percentage: 85,
    }
```

#### 2.6、work栏

 路径：/work--

##### 2.5.1、我的工作经历

查询全部

```
get: /get_Myjob
```

新增

```
post: /add_Myjob
{
        entry_time: time1,
        company_name: '上海铭皋教育科技有限公司',
        job_postName: '前端开发工程师',
        job_message: '负责公司教育培训类前台及后台的PC端以及移动端页面的开发工作，采用原生html,css,js实现功能。'
    }
```

#### 2.6、post栏

 路径：/post--

##### 2.6.1、我的文章分类列表

查询分类

```
get: /get_postCate  

```

新增

```
post: /add_postCate
{
	"name": "11111节传统撒大声地",
	"message": "dsadsjdhjashdjkashdjkhakda",
}
```

#####  

