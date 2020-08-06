

## 0、服务器配置

#### 修改Windows2012默认占用启动80端口

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

其中iis服务，已经改为非80的其他端口，所以iis可以继续正常使用。

#### ftp文件服务器配置

主机：106.xx.xx.xx 用户：**** 密码：******

服务器端创建账号时，需要勾选第二项的所有操作权限

客户端连接加密方式：只使用普通明文FTP

#### Navicat-mysql

```
host: '127.0.0.1',
 user: 'root',
 password: 'root',
 database: '数据库名称'
 端口：3306
```

#### 导入数据

```
1·打开Navicat ，点击右键选择新建数据库，名字跟我们要导入的数据库的名字一样，字符集一般选utf-8

2·点击确定，我们可以见到刚刚我们建好的数据库了，然后在新建的数据库上右击，选择“运行SQL文件”，在提示框中选择文件所在的路径，编码保持一致选择utf-8

3·提示Successfully 导入成功后，可能在左侧看不到导入的数据库，关闭Navicat，重新打开即可看到
```

## 1、HTTP和HTTPS

#### HTTP与HTTPS的区别

1、HTTP是超文本传输协议，信息是明文传输，HTTPS是具有安全性的SSL加密传输协议。

2、HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样。前者是80，后者是443。

3、HTTP和HTTPS的工作原理

HTTP的工作原理：一次HTTP操作称为一个事物，其工作过程可分为四步

1、Client与Server建立连接，单击某个超链接，HTTP的工作开始。

2、连接建立后，Client发送一个请求给Server，请求方式的格式为：统一资源标识符（URL）、协议版本号，后边是MIME信息包括请求修饰符，Client信息和可能的内容。

3、Server接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括Server信息、实体信息和可能的内容。

4、Client接收Server返回的信息通过浏览器显示在用户的显示屏上，然后Client和Server断开连接。

HTTPS的工作原理：

1、Client使用HTTPS的URL访问Web服务器，要求与Web服务器建立SSL连接。

2、Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。

3、客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。

4、客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。

5、Web服务器利用自己的私钥解密出会话密钥。

6、Web服务器利用会话密钥加密与客户端之间的通信。

5、HTTPS的优缺点：HTTP协议。

#### 端口

https端口：443 

　　服务项目：Https

　　网页浏览端口，能提供加密和通过安全端口传输的另一种HTTP，简单来说，就是HTTP安全版，打开的网页中，如果网址前缀为https，则说明该网站开启了https安全访问。

　　说明：443端口用于网页浏览，关闭电脑443端口，将会导致https网页无法正常打开。

HTTP：80端口

　　服务：HTTP

　　说明：用于网页浏览，关闭电脑80端口，将会导致无法打开网页。

　　HTTPS安全超文本传输协议，它是一个安全通信通道，它基于HTTP开发，用于在客户计算机和服务器之间交换信息。https和http最大区别在于前者通过安全加密，更安全。

#### https配置

```
需要引入服务器的ssl安全证书
var fs=require('fs');
var https=require('https');
var options={
	pfx: fs.readFileSync('./www.pengwang.xyz.pfx'),
	passphrase: '证书密码'
};
var httpsServer=https.createServer(options,app);
var SSLPORT=443;
httpsServer.listen(SSLPORT,function(){
	console.log('HTTPS Server is running on: https://localhost:%s',SSLPORT);
})
```

## 2、七牛云云存储

2.1七牛云自定义域名配置

2.1.1主域名和泛域名

```
主域名：例子 www.pengwang.xyz
泛域名：例子 img.pengwang.xyz
说明：一般主域名是在腾讯云、阿里云等域名商家购买的域名，该域名下可创建多个子域名，也就是泛域名，如果不是主站，建议绑定泛域名
```

2.1.2绑定SSL证书

```
腾讯免费SSL证书提供了不同服务器环境的版本，有Apache、Nginx、IIS等
七牛云创建的服务空间所绑定的自定义域名，HTTPS服务所需的SSL证书上传需要提供如下信息
证书备注名：填写你的域名；
证书内容：填写Nginx版本的1_www.beizigen.com_bundle.crt文件内容；
证书私钥：填写Nginx版本的2_www.beizigen.com.key文件内容。
说明：七牛云存储绑定域名开启https后，是需要按流量收费的，不过个人站点如果流量不大，收费一般是很低了，可以接受。
```

2.1.3配置 CNAME

```
说明：配置CNAME之后才能和该域名成功绑定，也就是域名厂商所说的域名解析
也就是需要在腾讯云域名解析列表中添加一行记录
将当前域名和七牛云提供的CNAME值绑定到一起(其实和绑定域名到云空间类似)
```

例子：

| 主机记录 | 记录类型  | 线路类型 | 记录值       | TTL(秒) |
| ---- | ----- | ---- | --------- | ------ |
| www  | CNAME | 默认   | 复制的CNAME值 | 600    |







## 3、使用基于ORM架构的sequelize操纵数据库

### 3.1技术背景

```
Sequelize是一个基于promise的关系型数据库ORM框架，*********************
技术文档
https://blog.csdn.net/lisemi/article/details/102941626----完整api
https://itbilu.com/nodejs/npm/VkYIaRPz-.html#induction-install----基础教程
https://itbilu.com/nodejs/npm/EJarwPD8W.html-----api
https://segmentfault.com/a/1190000017320533----操作多对多表关联
```

### 3.2安装

```
$ npm install --save sequelize
# 还需要安装以下之一：
$ npm install --save pg pg-hstore  // postgreSql
$ npm install --save mysql // mysql 或 mariadb
$ npm install --save sqlite3  
$ npm install --save tedious // MSSQL
```

### 3.2-2数据类型

```
Sequelize 中 Model 的数据类型对应MySQL中的数据类型
Sequelize.STRING                      // VARCHAR(255)                  类型：字符串 最大值： 65535个字符
Sequelize.STRING(1234)                // VARCHAR(1234)                 类型：变长 最大值： 65535个字符
Sequelize.TEXT                        // TEXT                          类型：字符串 最大值：65535个字符
Sequelize.TEXT('tiny')                // TINYTEXT                      类型：字符串 最大值：255个字符
Sequelize.INTEGER                     // INTEGER                       类型：整型 最大值：范围(-2147483648~2147483647)
Sequelize.BIGINT                      // BIGINT                        类型：整型 最大值：范围(+-9.22*10的18次方)
Sequelize.BIGINT(11)                  // BIGINT(11)                    类型：整型 最大值：范围(+-9.22*10的18次方)
Sequelize.FLOAT                       // FLOAT                         类型：单精度浮点型  8位精度(4字节)
Sequelize.FLOAT(11)                   // FLOAT(11)                     类型：单精度浮点型 8位精度(4字节)
Sequelize.FLOAT(11, 12)               // FLOAT(11,12)                  类型：精度浮点型 8位精度(4字节) m总个数，d小数位
Sequelize.DOUBLE                      // DOUBLE                        类型：双精度浮点型 16位精度(8字节) 
Sequelize.DOUBLE(11)                  // DOUBLE(11)                    类型：双精度浮点型 16位精度(8字节) 
Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)                 类型：双精度浮点型 16位精度(8字节) m总个数，d小数位
Sequelize.DECIMAL                     // DECIMAL                       类型：定点数型
Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)                 类型：定点数型 参数m<65 是总个数，d<30且 d<m 是小数位
Sequelize.DATE                        // DATETIME                      类型：日期时间类型 范例：'2009-05-12 02:31:44'
Sequelize.DATE(6)                     // DATETIME(6)    
Sequelize.DATEONLY                    // DATE without time.
Sequelize.BOOLEAN                     // TINYINT(1)                    类型：整型 范围(-128~127)
Sequelize.ENUM('value 1', 'value 2')  // ENUM                          类型：枚举
Sequelize.BLOB                        // BLOB                          类型：二进制数据
Sequelize.BLOB('tiny')                // TINYBLOB                      类型：二进制数据  
```



### 3.3建立连接

`Sequelize`会在初始化时设置一个连接池，这样你应该为每个数据库创建一个实例：

```
先引入，然后指向Sequelize构造函数，然后new实例化连接数据库
let Sequelize=require('sequelize')
var sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // 仅 SQLite 适用
  storage: 'path/to/database.sqlite'
});

// 或者可以简单的使用一个连接 uri
var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
```

### 2.4 `model`定义

`model`定义格式为`sequelize.define('name', {attributes}, {options})`：

```
const Projects_cates = sequelize.define("projects_cates", {
  project_id: Sequelize.STRING,
  cate_id: Sequelize.STRING,
}, {
  // freezeTabelName 为 true 时不会在库中映射表时增加复数表名
  // 该选项为 true 时，user 在映射时映射成 user，而为 false 时会映射成users
  freezeTableName: true
})

User.sync({force: true}).then(function () {
  // 已创建数据表
  然后写入表数据
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});
然后执行同步数据表 User改为sequelize，是全部执行同步
一次同步所有模型
可以使用sequelize.sync()方法来同步所有模型，而不是调用每个模型的sync()方法。
```



### 3.5、sequelize-nodejs方法

#### 3.5.1、执行多个方法

```
Promise.all([
        db.Project_list.create({
            name: '全功能APP UI KITS'
        }),
        db.Project_cate.create({
        name: '全部11'
        })
    ]).then(async (results)=>{
        console.log('插入数据--------');
    }).catch();
    results------>是返回的对象，里面包含很多执行函数
```

#### 3.5.2、插入数据

##### `create()` - 插入单条数据

```
create(values, [options]) -> Promise.<Instance>
```

构建一个新的模型实例，并进行保存。与`build()`方法不同的是，此方法除创建新实例外，还会将其保存到对应数据库表中。

**参数**

| 名称                           | 类型          | 说明                                   |
| ---------------------------- | ----------- | ------------------------------------ |
| values                       | Object      |                                      |
| [options]                    | Object      |                                      |
| [options.raw=false]          | Boolean     | 设置为`true`时，值会忽略字段和虚拟设置器              |
| [options.isNewRecord=true]   | Boolean     |                                      |
| [options.fields]             | Array       | 如果设置后，只有列表中区别的列才会进行保存                |
| [options.include]            | Array       | 用于构建`prefetched/included`模型，参见 `set` |
| [options.onDuplicate]        | String      |                                      |
| [options.transaction]        | Transaction | 在事务中执行查询                             |
| [options.logging=false]      | Function    | 一个用于打印查询时所执行sql的函数                   |
| [options.searchPath=DEFAULT] | String      | 指定schema的 search_path (仅 Postgres)   |
| [options.benchmark=false]    | Boolean     | 当打印SQL日志时同时输出查询执行时间（毫秒）              |

##### `bulkCreate()` - 创建多条记录

```
model.bulkCreate([
  {
   name: '全部',
   btn_icon: 'fa fa-server fa-lg',
  },{
   name: 'PC端',
   btn_icon: 'fa fa-television fa-lg',
  }
])

```

批量创建并保存多个实例。

处理成功后，会在回调函数中返回一个包含多个实例的数组。

**参数**

| 名称                               | 类型          | 说明                                    |
| -------------------------------- | ----------- | ------------------------------------- |
| records                          | Array       | 要创建实例的对象（键/值 对）列表                     |
| [options]                        | Object      |                                       |
| [options.fields]                 | Array       | 要插入的字段。默认全部                           |
| [options.validate=true]          | Boolean     | 插入每条记录前进行验证                           |
| [options.hooks=true]             | Boolean     | 在执行前/后创建钩子                            |
| [options.individualHooks=false]  | Boolean     | 在执行前/后为每个实例创建钩子                       |
| [options.ignoreDuplicates=false] | Boolean     | 忽略重复主键（Postgres不支持）                   |
| [options.updateOnDuplicate]      | Array       | 如果行键已存在是否更新（mysql & mariadb支持）. 默认为更新 |
| [options.transaction]            | Transaction | 在事务中执行查询                              |

##### `findCreateFind()` - 查找或创建

```
findCreateFind(options) -> Promise.<Instance, created>
```

效率更高的`findOrCreate`，不会在事务中执行。首先会尝试进行查询，如果为空则尝试创建，如果是唯一约束则尝试再次查找。

**参数**

| 名称                    | 类型          | 说明          |
| --------------------- | ----------- | ----------- |
| options               | Object      |             |
| options.where         | Object      | 查询属性        |
| [options.defaults]    | Object      | 用于创建新实例的默认值 |
| [options.transaction] | Transaction | 在事务中执行查询    |

#### 3.5.3、查询数据

##### findAll()` - 查询多条数据

<https://itbilu.com/nodejs/npm/V1PExztfb.html#api-findAll>

```
findAll([options]) -> Promise.<Array.<Instance>>
查找范围==》id=1,2的对象
findAll({
'order': [['id', 'DESC']], //排序降序
  where: {id: [1,2]}  //筛选
})
返回原始结果
findAll({
  raw: true
})
连表查询并统计count条数
post=await db.Post_list.findAndCountAll({
    include: [{
      model: db.Post_cate
    }],
    where: {'$post_cates.id$': req.body.cate_id},
    raw: false
  })
  
  console.log(post,'全部文章');
```



#####  `findById()` - 通过Id查询单条数据

```
findById(id, [options]) -> Promise.<Instance>
```

通过Id（主键）查询单个实例（单条数据）。

**参数**

| 名称                           | 类型                         | 说明                                 |
| ---------------------------- | -------------------------- | ---------------------------------- |
| id                           | Number \| String \| Buffer | 要查询实例的主键                           |
| [options]                    | Object                     |                                    |
| [options.transaction]        | Transaction                | 在事务中执行查询                           |
| [options.searchPath=DEFAULT] | String                     | 指定schema的 search_path (仅 Postgres) |

#####  `count()` - 统计查询结果数

```
count([options]) -> Promise.<Integer>
```

统计符合查询条件的结果总数。

如果提供了`include`，将计算匹配关联的数目

**参数**

| 名称                           | 类型          | 说明                                       |
| ---------------------------- | ----------- | ---------------------------------------- |
| [options]                    | Object      |                                          |
| [options.where]              | Object      | 查询属性（条件）                                 |
| [options.include]            | Object      | Include 选项                               |
| [options.distinct]           | boolean     | 在主键上使用 COUNT(DISTINCT(col)), `Model.aggregate` 要使用其它列 |
| [options.attributes]         | Object      | 在 `group`中联合使用                           |
| [options.group]              | Object      | 创建复杂统计时，会返回所需要的多行                        |
| [options.transaction]        | Transaction | 在事务中执行查询Transaction to run query under   |
| [options.logging=false]      | Function    | 一个用于打印查询时所执行sql的函数                       |
| [options.searchPath=DEFAULT] | String      | 指定schema的 search_path (仅 Postgres)       |
| [options.benchmark=false]    | Boolean     | 当打印SQL日志时同时输出查询执行时间（毫秒）                  |

#####  `findAndCount()` - 分页查询

```
findAndCount([findOptions]) -> Promise.<Object>
```

查询由`offset/limit`指定的所有匹配行，并返回查询条件所匹配的总数量。

```
Model.findAndCountAll({
  where: ...,
  limit: 12,
  offset: 12
}).then(function (result) {
  ...
})
```

在上面查询中，`result`是一个包含以两个属性的对象：

```
{
  rows: [],
  count: 
}
```

`result.rows`是匹配的查询行，`result.count`是查询条件匹配的总数量。

如果提供了`include`，将计算匹配关联的数目

```
User.findAndCountAll({
  include: [
     { model: Profile, required: true}
  ],
  limit 3
});
```

#### 3.5.4、`update()` - 更新记录

```
// 修改每个`lastName`为`null`的记录修改为"Doe"
User.update({ lastName: "Doe" }, {
  where: {
    lastName: null
  }
}).then(() => {
  console.log("Done");
});

```

**参数**

| 名称                              | 类型          | 说明                            |
| ------------------------------- | ----------- | ----------------------------- |
| values                          | Object      |                               |
| options                         | Object      |                               |
| options.where                   | Object      | 筛选条件                          |
| [options.fields]                | Array       | 要更新字段，默认为全部                   |
| [options.validate=true]         | Boolean     | 更新每条记录前进行验证                   |
| [options.hooks=true]            | Boolean     | 在执行更新前/后创建钩子                  |
| [options.individualHooks=false] | Boolean     | 在执行更新前/后为每个实例创建钩子             |
| [options.sideEffects=true]      | Boolean     | 是否更新任何虚拟设置                    |
| [options.returning=false]       | Boolean     | 返回受影响的行 (仅适用于 postgres)       |
| [options.limit]                 | Number      | 要更新的行数 (仅适用于 mysql 和 mariadb) |
| [options.transaction]           | Transaction | 在事务中执行查询                      |
| [options.silent=false]          | Boolean     | 如果为`true`，updatedAt字段将不会更新    |

#### 2.5.5 `destroy()` - 删除记录

```
destroy(options) -> Promise.<Integer>
// 删除每个名为 "Jane" 的记录
User.destroy({
  where: {
    firstName: "Jane"
  }
}).then(() => {
  console.log("Done");
});
```

删除多个实例，或设置deletedAt的时间戳为当前时间（当启用`paranoid`时）

执行成功后返回被删除的行数

**参数**

| 名称                              | 类型          | 说明                                       |
| ------------------------------- | ----------- | ---------------------------------------- |
| options                         | Object      |                                          |
| [options.where]                 | Object      | 筛选条件                                     |
| [options.hooks=true]            | Boolean     | 在执行前/后创建钩子                               |
| [options.individualHooks=false] | Boolean     | 在执行前/后为每个实例创建钩子                          |
| [options.limit]                 | Number      | 要删除的行数                                   |
| [options.force=false]           | Boolean     | 删除而不是设置 deletedAt 为当前时间戳 (仅启用 `paranoid` 时适用) |
| [options.truncate=false]        | Boolean     | 设置为`true`时，会使用`TRUNCATE`代替`DELETE FROM`，这时会忽略`where`和`limit`选项 |
| [options.cascade=false]         | Boolean     | 仅适用于连接查询时的`TRUNCATE`操作，截断所有外键匹配的表        |
| [options.transaction]           | Transaction | 在事务中执行查询                                 |

### 2.6 关联关系

<https://itbilu.com/nodejs/npm/sequelize-docs-v5.html#creating-persistent-instances>

1. `BelongsTo`
2. `HasOne`
3. `HasMany`
4. `BelongsToMany`