<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <div class="title">
        <span>技术栈</span>
        
      </div>
      <div class="echarts" v-for="(item,index) in echartList" :key="index">
        <div class="name">{{item.skill_name}}</div>
        <div class="echart">
          <el-progress :color="echartColorList[index]" :text-inside="true" :stroke-width="30" :percentage="item.skill_percentage"></el-progress>
        </div>
        <div class="tag">
          <el-tag  style="margin-right:10px">编辑</el-tag>
          <el-tag type="danger" >删除</el-tag>
        </div>
      </div>
      <el-button style="margin-left:0px;" type="primary" icon="el-icon-plus">新增</el-button>
    </el-card>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now()//如果没有后面的-8.64e7就是不可以选择今天的
       }
      },
      common: ['我的技能'], // 公共组件传值
      echartColorList: ['#409EFF','#67C23A','#E6A23C','#F56C6C','#C4B4E4','#409EFF','#67C23A','#E6A23C','#F56C6C','#C4B4E4'],
      echartList: [
        {skill_name: 'HTML5/CSS3',skill_percentage: 85},
        {skill_name: 'JavaScript',skill_percentage: 90},
        {skill_name: 'Vue',skill_percentage: 90},
        {skill_name: '小程序',skill_percentage: 95},
        {skill_name: 'NodeJs',skill_percentage: 75}]
    }
  },
  created() {
  },
  methods: {
    // //获取所以罚款信息
    // async getDelayPenaltyAll() {
    //   const { data: penalty_res } = await getPenaltyAll_api()
    //   if (penalty_res.status !== 200) return this.$message.error(res.msg)
    //   this.tableData = penalty_res.data
    //   this.allCount = penalty_res.total
    // },
	  
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.box-card {
  .title {
    font-size: 20px;
    color: #333;
    font-weight: 550;
    margin-bottom: 20px;
  }
  .echarts {
    margin-bottom: 30px;
    width: 750px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .name {
      height: 30px;
      line-height: 30px;
      width: 140px;
    }
    .echart {
      flex: 1;
    }
    .tag {
      margin-left: 20px;
    }
  }
}
.page_size{display: inline-block;float: right;}
</style>
