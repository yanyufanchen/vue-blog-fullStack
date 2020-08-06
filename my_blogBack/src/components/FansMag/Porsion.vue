<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <div class="title">人员管理</div>
      <div class="table">
        <div class="table">
          <el-table :data="tableData" border="" style="width: 100%">
            <el-table-column prop="date" label="注册日期" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="source" label="来源" width="100"></el-table-column>
            <!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
            <el-table-column prop="commentNum" label="评论数" min-width="100"></el-table-column>
            <el-table-column prop="likeNum" label="点赞数" min-width="100"></el-table-column>
            <!-- <el-table-column prop="zip" label="邮编" width="120"></el-table-column> -->
            <el-table-column label="操作" min-width="30">
              <template slot-scope="scope">
                <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background=""
          :page-size="pageSize"
          :total="ProjectTotal"
          @current-change="changePage"
          @prev-click="prevPage"
          @next-click="nextPage"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['人员管理'], // 公共组件传值
      tableData: [{
          date: '2016-05-02',
          name: '凡尘',
          commentNum: 100,
          likeNum: 1000,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
      }],
      ProjectTotal: 25,
      pageSize: 6
    }
  },
  created () {
  },
  methods: {
    // 删除评论
    handleDelete (index, row) {
      console.log(index, row);
    },
    // 改变当前页
	  changePage (val) {
      console.log(val);
    },
    // 上一页
    prevPage (val) {
      console.log(val);
    },
    // 下一页
    nextPage (val) {
      console.log(val);
    }
  },
  mounted () {}
}
</script>


<style lang="less" scoped>

.box-card {
  .title {
       font-weight: 550;
       color: #000;
     }
  
  
}
</style>
