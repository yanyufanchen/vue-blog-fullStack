<template>
   <el-breadcrumb separator=">">
   <!--  -->
      <el-breadcrumb-item :to="{ path: '/admin/home' }" @click.native="toHome" >首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in value " :key="item.id" >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
           
<script>
export default{
      props:["value"],
       data(){
          return{
             activePath:'/admin/home'
          }
       } ,
      methods: {
         toHome(){
            // 直接出发最顶层组件的方法
            this.$parent.$parent.$parent.$parent.$parent.home()
         }
      },
      mounted() {
         // eventHub
      },
}
</script>
<style scoped>
            
</style>