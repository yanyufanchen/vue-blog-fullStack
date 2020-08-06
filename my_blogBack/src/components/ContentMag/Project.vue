<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <div class="cate">
              <div class="cate_header">
                <div class="tltle">项目分类</div>
                <div class="addCate" :style="{background: this.$store.state.themeColor}">
                  <i class="el-icon-plus" style="margin-right:10px;"></i>
                  <span>新增分类</span>
                </div>
              </div>
              <div class="treeCate">
                <el-tree
                  :data="dataCate"
                  :props="defaultProps"
                  :default-expand-all="true"
                  :check-on-click-node="true"
                  :highlight-current="true"
                  accordion
                  @node-click="handleNodeClick"
                ></el-tree>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple">
            <div class="post">
              <div class="post_header">
                <div class="tltle">项目列表</div>
                <div class="addPost" :style="{background: this.$store.state.themeColor}">
                  <i class="el-icon-plus" style="margin-right:10px;"></i>
                  <span>新增项目</span>
                </div>
              </div>
              <div class="post_center">
                <div class="selct">
                  <el-dropdown @command="selctCatePost" split-button type="primary">全部分类
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a">PC端</el-dropdown-item>
                      <el-dropdown-item command="b">移动端</el-dropdown-item>
                      <el-dropdown-item command="c">小程序</el-dropdown-item>
                      <el-dropdown-item command="d">APP</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-input
                    style="width:200px;margin-left:20px;"
                    placeholder="请输入内容"
                    v-model="searchPost"
                    @clear="searchPostAllFn"
                    :clearable="true"
                  />
                  <el-button @click="searchPostFn" type="primary" icon="el-icon-search" style="margin-left:10px;"></el-button>
                </div>
                <div class="table">
                  <el-table :data="tableData" border="" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="90"></el-table-column>
                    <el-table-column prop="name" label="名称" width="100"></el-table-column>
                    <el-table-column prop="cateName" label="所属分类" width="70"></el-table-column>
                    <!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
                    <el-table-column prop="message" label="项目描述" min-width="290"></el-table-column>
                    <!-- <el-table-column prop="zip" label="邮编" width="120"></el-table-column> -->
                    <el-table-column label="操作" min-width="135">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-pagination background :page-size="pageSize" :total="ProjectTotal" @current-change="changePage" @prev-click="prevPage" @next-click="nextPage"  layout="prev, pager, next" ></el-pagination>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['项目管理'], // 公共组件传值
      searchPost: '',
      dataCate: [{
          label: '全部分类',
          children: [{
            id: 1,
            label: '移动端',
          },{
            id: 2,
            label: 'PC端',
          },{
            id: 3,
            label: 'APP',
          },{
            id: 4,
            label: '小程序',
          }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
       tableData: [{
          date: '2016-05-02',
          name: '全功能App',
          cateName: 'App',
          message: '新鲜时尚的全功能APP UI KITs,集成时尚高端购物，社区推广互动为一体的社交商城',
          // zip: 200333
      }],
      ProjectTotal: 25,
      pageSize: 6
    }
  },
  created () {
  },
  methods: {
    // 选择分类
    handleNodeClick (data) {
        console.log(data)
    },
    // 项目栏选择分类
    selctCatePost (command){
      console.log(command)
    },
    // 搜索项目
    searchPostFn(){
      console.log(this.searchPost,'搜索关键词')
    },
    searchPostAllFn(val){
      console.log(val,'搜索全部')
    },
    // 编辑项目
    handleEdit (index, row) {
      console.log(index, row);
    },
    // 删除项目
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
  mounted () {
    console.log(this.$parent,'project');
    
  }
}
</script>


<style lang="less" scoped>

.box-card {
  
  .cate {
    .cate_header {
      display: flex;
      height: 50px;
      justify-content: space-around;
      align-items: center;
      font-size: 16px;
      .tltle {
        font-weight: 550;
        color: #000;
      }
      .addCate {
        cursor: pointer;
        padding: 0 10px;
        border-radius: 30px;
        color: #fff;
        line-height: 30px;
      }
    }
  }
  .post {
    min-height: 800px;
    border-left: 1px solid #eee;
    .post_header {
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      display: flex;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      .tltle {
        font-weight: 550;
        color: #000;
      }
      .addPost {
        cursor: pointer;
        padding: 0 10px;
        border-radius: 30px;
        color: #fff;
        line-height: 30px;
      }
    }
    .post_center {
      padding: 10px;
      .selct {
        display: flex;
        align-items: center;
      }
    }
  }
  
}
</style>
