<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: [], // 公共组件传值
    }
  },
  methods: {
    
  },
  mounted() {}
}
</script>
<style lang="less">
* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html, body, #app {
  min-width: 1040px!important;
    overflow: auto;
}
a {
    text-decoration: none;
    color: #75B9E6;
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
a:active {
    text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
