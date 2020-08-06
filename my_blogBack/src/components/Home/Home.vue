<template>
  <div class="home">
    <div class="header">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div class="title">
              <i class="el-icon-edit"></i>
              <span>首页</span>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div class="nowdate">
              <span class="year" :style="{backgroundColor: this.$store.state.themeColor}">2020/5/10</span>
              <span class="time" :style="{color: this.$store.state.themeColor}">16:37</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="centent">
      <el-row :gutter="20">
        <el-col :span="15">
          <div class="grid-content bg-purple">
            <div class="left">
              <div class="card">
                <el-row :gutter="30">
                  <el-col
                    :span="8"
                    :style="{marginBottom:'30px'}"
                    v-for="(item,index) in [1,2,3,4,5,6]"
                    :key="index"
                  >
                    <el-card shadow="hover">
                      <div class="cardBox">
                        <div class="card_left">
                          <div class="card_txt">新用户</div>
                          <div class="card_Num">387</div>
                        </div>
                        <div class="card_right">
                          <i class="el-icon-edit"></i>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <div class="echat">
                <el-card>
                  <div class="echart">
                    <div class="echart_title">
                      <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item name="1">
                          <template slot="title">
                            访问热度折线图
                            <i class="header-icon el-icon-info"></i>
                          </template>
                          <ve-line :data="chartData"></ve-line>
                        </el-collapse-item>
                      </el-collapse>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light">
            <div class="right">
              <el-card>
                <div class="echart">
                  <div class="echart_top">
                    <ve-histogram :data="chartData1" :settings="chartSettings"></ve-histogram>
                  </div>
                  <div class="echart_bottom" v-for="(item,index) in [1,2,3,4,5,6]" :key="index">
                    <div class="comment">
                      <div class="comment_left">
                        <div class="comment_header"></div>
                        <div class="comment_content">
                          <div class="comment_title">凡尘</div>
                          <div class="comment_txt">过来冒个泡！</div>
                        </div>
                      </div>
                      <div class="comment_right">
                        <span>2011/12/22</span>
                      </div>
                    </div>
                    <div class="comment_line"></div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import {} from '@/api'
  import moment from 'moment' // 时间过滤插件
export default {
  data() {
    this.chartSettings = {
        axisSite: { right: ['下单率'] },
        yAxisType: ['KMB', 'percent'],
        yAxisName: ['数值', '比率']
      }
    return {
      common: [], // 公共组件传值
      activeNames: ['1'],
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
      },
      chartData1: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
    }
  },
  created() {
  },
  methods: {
    handleChange(val) {
        console.log(val)
    }
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
.home {
  .header {
    .title {
      font-size: 25px;
      font-weight: 550;
    }
    .grid-content {

    }
    .nowdate {
      display: flex;
      height: 50px;
      justify-content: flex-end;
      span {
        line-height: 50px;
        text-align: center;
        font-size: 15px;
        padding: 0 10px;
      }
      .year {
        color: #fff;
        border-radius: 10px 0 0 10px;
      }
      .time{
        border-radius: 0 10px 10px 0;
        background-color: rgb(250, 250, 250);
      }
    }
  }
  .centent {
    margin-top: 20px;
    .left {
      // background-color: pink;
      .card {
        .cardBox {
          display: flex;
          justify-content: space-between;
          .card_left {
            .card_txt {
              font-size: 18px;
              color: rgb(110, 108, 108);
            }
            .card_Num {
              font-size: 30px;
              color: #D7D7D7;
              font-weight: 550;
            }
          }
          .card_right {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            font-size: 30px;
            text-align: center;
            line-height: 50px;
            color: #fff;
            background-color: #EF806C;
          }
        }
      }
    }
    .right {
      // background-color: purple;
      .echart {
        height: 738px;
        .echart_bottom {
          .comment{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .comment_left {
              display: flex;
              align-items: center;
              .comment_header {
                width: 30px;
                height: 30px;
                border-radius: 30px;
                margin-right: 10px;
                background-color: #ccc;
              }
              .comment_content {
                .comment_title {
                  color: #333;
                  font-size: 14px;
                }
                .comment_txt {
                  color: #666;
                  font-size: 12px;
                }
              }
            }
            .comment_right {
              height: 100%;
              color: #bbb;
              font-size: 10px;
              display: flex;
              align-items: flex-start;
            }
          }
          .comment_line {
            border-top: 1px solid #eee;
            width: 100%;
            margin: 10px 0;
          }
        }
      }
    }
  }
  
}
</style>
