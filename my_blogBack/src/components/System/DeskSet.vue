<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="box-card">
      <div class="title">前台管理</div>
      <div class="theme">
        <div class="theme_title">
          <div class="theme_txt">选择便捷主题色</div>
          <div class="theme_line"></div>
        </div>
        <div class="theme_btns">
          <div
            @click="fixedClick($event)"
            :data-color="item"
            class="theme_btn"
            v-for="item in themeList"
            :key="item"
            :style="{background: item}"
          >主题色</div>
        </div>
      </div>
      <div class="theme">
        <div class="theme_title">
          <div class="theme_txt">示例</div>
          <div class="theme_line"></div>
        </div>
        <div class="theme_btns">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
        <div class="theme_btns">
          <el-link type="primary">主要链接</el-link>
          <el-link type="success">成功链接</el-link>
          <el-link type="warning">警告链接</el-link>
          <el-link type="danger">危险链接</el-link>
        </div>
        <div class="theme_btns">
          <el-switch style="margin-right:10px;" v-model="valueswitch"></el-switch>
          <el-switch style="margin-right:10px;" v-model="valueswitch" active-color="#13ce66"></el-switch>
          <el-switch style="margin-right:10px;" v-model="valueswitch" active-color="#90ee90"></el-switch>
          <el-switch style="margin-right:10px;" v-model="valueswitch" active-color="#c71585"></el-switch>
          <el-switch style="margin-right:10px;" v-model="valueswitch" active-color="#ff4500"></el-switch>
        </div>
        <div class="theme_btns">
          <i style="color:#ffd700;margin-right:10px;" class="el-icon-edit"></i>
          <i style="color:#90ee90;margin-right:10px;" class="el-icon-share"></i>
          <i style="color:#c71585;margin-right:10px;" class="el-icon-user-solid"></i>
          <i style="color:#ff4500;margin-right:10px;" class="el-icon-delete"></i>
          <i style="color:#c7158577;margin-right:10px;" class="el-icon-s-goods"></i>
        </div>
      </div>
      <div class="theme">
        <div class="theme_title">
          <div class="theme_txt">还可以自定义主题色</div>
          <div class="theme_line"></div>
        </div>
        <div class="theme_btns">
          <el-color-picker v-model="deskTheme"></el-color-picker>
          <el-button @click="customClick" style="margin-left:10px;" size="small" type="primary">点击修改</el-button>
        </div>
      </div>
      <!-- <div class="block">
        <span class="demonstration">有默认值</span>
        
      </div>-->
    </el-card>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    return {
      common: ['前台管理'], // 公共组件传值
      valueswitch: true,
      themeList: [
        "#409EFF",
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "#c7158577"
      ],
      deskTheme: '' // 
    }
  },
  created () {
    this.deskTheme="#ccc" // 获取前台主题色
  },
  methods: {
    // 固定色提交
    fixedClick(e){
      console.log(e.target.dataset.color,'选择的颜色');
      this.ascertain(e.target.dataset.color)
    },
    // 自定义色提交
    customClick(){
       console.log(this.deskTheme,'选择的颜色');
      this.ascertain(this.deskTheme)
    },
    // 提交弹框
    ascertain(color) {
      console.log(color,'选择的颜色');
        this.$confirm('要修改前台主题色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      }
  },
  mounted () {}
}
</script>


<style lang="less" scoped>

.box-card {
  .title {
       font-weight: 550;
       font-size: 20px;
       color: #000;
  }
  .theme {
    margin-top: 20px;
    .theme_title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .theme_txt {
        font-weight: 550;
        font-size: 15px;
        margin-right: 10px;
        color: #333;
      }
      .theme_line {
        flex: 1;
        height: 1px;
        background-color: #eee;
      }
    }
    .theme_btns {
      margin-top: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .theme_btn {
        margin-right: 10px;
        font-size: 12px;
        color: #fff;
        padding: 0 15px;
        height: 25px;
        line-height: 25px;
        border-radius: 25px;
        cursor: pointer;
      }
    }
  }
}
</style>
