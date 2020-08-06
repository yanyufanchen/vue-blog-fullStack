<template>
  <div class="home_content">
    <el-container class="constent">
      <el-header class="header">
        <div class="logo">
          <img src="../images/logo.png"
               alt="">
        </div>
        <div class="logo_title">
          <span>个人博客后台管理</span>
          <span :style="{backgroundColor: this.$store.state.themeColor}"
                class="home"
                @click="home">
            <router-link style="color:#fff"
                         to="/admin/home">首页</router-link>
          </span>
          <span :style="{backgroundColor: this.$store.state.themeColor}"
                class="color">
            自定义主题色
            <i class="el-icon-caret-right"></i>
          </span>
          <!-- <input type="color" name="color" :value="this.$store.state.themeColor" id="color" @change="changeColor" /> -->
          <colorPicker></colorPicker>
        </div>
        <div class="out"
             @click="layout()">退出</div>
      </el-header>
      <!-- 页面主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="toggle_menu?'60px':'200px'"
                  class="aside">
          <div class="toggit"
               @click="toggle">
            <i :class="tabIcon[tabIconIndex]"></i>
          </div>
          <el-menu :default-active="activePath"
                   class="el-menu-vertical-demo"
                   background-color="#242424"
                   text-color="#fff"
                   :active-text-color="this.$store.state.themeColor"
                   unique-opened
                   router
                   :collapse="toggle_menu"
                   :collapse-transition="false"
                   ref="menu">
            <el-submenu :index="index+''"
                        v-for="(item, index) in menulist "
                        :key="item.id">
              <template slot="title"
                        class="first">
                <i :class="item.icon"
                   class="title_icon"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="'/'+subItem.path"
                            v-for="subItem in item.children"
                            @click="saveNavState('/' + subItem.path,index+'')"
                            :key="subItem.id">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-caret-right"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { asize_api } from '@/api'
import { log } from 'util';
export default {
  data () {
    return {
      tabIconIndex: '001',
      tabIcon: {
        '001': 'el-icon-s-fold',
        '002': 'el-icon-s-unfold'
      },
      menulist: [{
        id: 101,
        authName: "个人信息",
        icon: 'el-icon-user-solid',
        children: [{
          id: 1011,
          authName: "基本信息",
          path: 'admin/about_me',
        }, {
          id: 1012,
          authName: "技术栈",
          path: 'admin/skill',
        }]
      }, {
        id: 102,
        authName: "内容管理",
        icon: 'el-icon-s-marketing',
        children: [{
          id: 1021,
          authName: "项目管理",
          path: 'admin/project',
        }, {
          id: 1022,
          authName: "文章管理",
          path: 'admin/post',
        }]
      }, {
        id: 103,
        authName: "粉丝管理",
        icon: 'el-icon-s-comment',
        children: [{
          id: 1031,
          authName: "人员管理",
          path: 'admin/porsion',
        }, {
          id: 1032,
          authName: "评论管理",
          path: 'admin/comment',
        }]
      }, {
        id: 104,
        authName: "系统设置",
        icon: 'el-icon-setting',
        children: [{
          id: 1041,
          authName: "账号管理",
          path: 'admin/account',
        }, {
          id: 1042,
          authName: "前台管理",
          path: 'admin/deskset',
        }]
      }
      ],
      toggle_menu: false,
      // 被激活的链接地址
      activePath: '',
    }
  },
  methods: {
    saveNavState (keyPath, index) {
      // 存储侧边栏子栏请求地址
      window.sessionStorage.setItem('activePath', keyPath)
      window.sessionStorage.setItem('tabIndex', index)
      this.activePath = keyPath
    },
    home () {
      // this.$router.push('/admin/home')
      window.sessionStorage.setItem('activePath', '/admin/home')
      // 初始化侧边栏
      this.activePath = ''
      let index = window.sessionStorage.getItem('tabIndex')
      this.$refs.menu.close(index)
    },
    toggle () {
      // 切换关闭侧边栏
      this.toggle_menu = !this.toggle_menu
      if (!this.toggle_menu) {
        this.tabIconIndex = '001'
      } else {
        this.tabIconIndex = '002'
      }
    },
    // 退出
    layout () {
      var _self = this
      this.$confirm('确定要退出吗?', {
        confirmButtonText: '退出',
        cancelButtonText: '再等等',
        type: 'warning',
        center: true
      })
        .then(function () {
          // 退出系统
          window.sessionStorage.removeItem('token')
          window.sessionStorage.removeItem('activePath')
          window.sessionStorage.removeItem('tabIndex')
          _self.$router.push({  // 核心语句
            path: '/login',   // 跳转的路径
          })
        })
        .catch(function (err) {
          console.log('Cancel')
        })
    },
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')

  },
  mounted () {
    let url = window.location.href
    let path = url.slice(url.lastIndexOf('/admin') + 1)
    console.log(path, 1111);

    // if ( path == 'admin/home' ) {
    //   console.log(this.$refs,111);
    //   this.activePath=''
    //   this.$refs.menuRef.close()
    // }
  }
}
</script>

<style lang="less" scoped>
.home_content {
  width: 100%;
  height: 100%;
  .constent {
    width: 100%;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #242424;
      .logo {
        // width: 40px;
        height: 100%;
        img {
          height: 100%;
        }
      }
      .logo_title {
        display: flex;
        margin-left: 20px;
        width: 85%;
        color: #fff;
        font-size: 20px;
        justify-content: flex-start;
      }
      .home ,.color{
        height: 40px;
        cursor: pointer;
        margin-left: 20px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        padding: 0 10px;
        line-height: 40px;
        color: #fff;
        // background-color: #128b8f;
      }
      .color {
        cursor: pointer;
        margin-right: 10px;
      }
      .out {
        // width: 80px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        padding: 0 20px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        background-color: #7f8c8d;
      }
      .out:hover{
        cursor: pointer;
        background: #969896;
      }
    }
    .aside {
      background-color: #242424;
      .toggit {
        text-align: center;
        font-size: 20px;
        letter-spacing: 0.2em;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
        color: #fff;
        background-color: #242424;
      }
    }
    .main {
      background-color: #eee;
    }
  }
}
.el-menu {
  border-right: none;
}
.title_icon {
  margin-right: 10px;
}
</style>
<style>
.home_content .el-submenu .el-submenu__title:hover {
  background-color: #eb3b5a !important;
}
.home_content .el-submenu .el-menu-item:hover {
  background-color: #eb3b5a !important;
}
</style>
