<template>
  <div>
    <!-- 导航 -->
    <Breadcrumb :value="common"></Breadcrumb>
    <el-card class="about_me">
      <div class="header">
        <span class="title">头像：</span>
        <el-avatar class="img"
                   :size="100"
                   :src="fileList.length>0?fileList[0].url:circleUrl"></el-avatar>
        <div class="uploadImg">
          <el-upload ref="upload"
                     class="upload-demo"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :on-preview="handlePreview"
                     :on-remove="handleRemove"
                     :before-remove="beforeRemove"
                     :on-change="progressImg"
                     :file-list="fileList"
                     :auto-upload="false"
                     :limit="uploadImgNum"
                     list-type="picture">
            <el-button slot="trigger"
                       size="small"
                       type="primary">{{fileList.length>0?'替换头像':'选择头像'}}</el-button>
            <el-button style="margin-left: 10px;"
                       size="small"
                       type="success"
                       @click="submitUpload">确定上传</el-button>
            <div slot="tip"
                 class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
      <div class="from"
           style="width:500px;margin-top:30px;">
        <el-form :label-position="labelPosition"
                 label-width="80px"
                 :rules="rules"
                 ref="ruleForm"
                 :model="ruleForm">
          <el-form-item label="昵称"
                        prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="出生日期"
                        required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.date1"
                                :default-value="ruleForm.date1"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line"
                    :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间"
                                v-model="ruleForm.date2"
                                :default-value="ruleForm.date2"
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="性别"
                        prop="six">
            <el-select v-model="ruleForm.six"
                       placeholder="请选择">
              <el-option label="男"
                         value="0"></el-option>
              <el-option label="女"
                         value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介"
                        prop="intro">
            <el-input type="textarea"
                      v-model="ruleForm.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">立即保存</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="saying">
        <div class="title">我的语录</div>
        <div class="tag">
          <el-table :data="me_info"
                    style="width: 100%">
            <el-table-column label="日期"
                             width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createdAt | moment('YYYY-MM:DD hh:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column label="语录"
                             width="300">
              <template slot-scope="scope">
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.message }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment' // 时间过滤插件
import { aboutMeMessageApi, aboutMeinformationApi } from '@/api'
export default {
  data () {
    return {
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now()//如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      common: ['基本信息'], // 公共组件传值
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      fileList: [], // 上传头像
      uploadImgNum: 1, // 允许上传数量
      notImg: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
      labelPosition: 'left',
      // 基本信息表单
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
        six: '',
        intro: ''
      },
      // 基本信息表单验证
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'string', required: true, message: '请选择时间', trigger: 'change' }
        ],
        six: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        intro: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ]
      },
      // 语录

      me_info: []
    }
  },
  created () {
    this.getdata()
  },

  methods: {
    // 提交基本信息表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  alert('submit!')
          console.log(this.ruleForm, '保存表单');

        } else {
          console.log('error submit!!')
          return false;
        }
      })
    },

    submitUpload () {
      console.log('确定上传');
      this.$refs.upload.submit();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      console.log(this.fileList, 111);
    },
    handlePreview (file) {
      console.log(file);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    progressImg (file, fileList) {
      console.log(file, fileList, 222)

    },

    // 编辑语录
    handleEdit (index, row) {
      console.log(index, row);
    },
    // 删除语录
    handleDelete (index, row) {
      console.log(index, row);
    },
    // 新增语录

    // 获取数据
    getdata () {
      // 获取about_me_message
      this.getMe_messageAll()
      this.getMe_DetailAll()
    },
    // 获取about_me_message
    async getMe_messageAll () {
      const { data: res } = await aboutMeMessageApi()
      console.log(res, '查询服务器-我的语录')
      if (res.statu !== 200) return this.$message.error(res.mes)
      // res.data.forEach
      this.me_info = res.data
    },
    // 获取about_me_详细信息
    async getMe_DetailAll () {
      const { data: res } = await aboutMeinformationApi()
      console.log(res, '查询服务器-我的详细信息')
      if (res.statu !== 200) return this.$message.error(res.mes)
      this.ruleForm.name = res.data[0].nickname
      this.ruleForm.six = res.data[0].six == 0 ? '男' : '女'
      console.log(res.data[0].birthday, 111);
      let time = new Date(res.data[0].birthday).getTime()
      let date1 = this.VTime.formatTime(time, 'Y-M-D')
      let date2 = this.VTime.formatTime(time, 'h:m:s')
      // this.ruleForm.data1 = date1
      // this.ruleForm.data2 = date2
      this.$set(this.ruleForm, 'date1', date1)
      this.$set(this.ruleForm, 'date2', date2)
      this.ruleForm.intro = res.data[0].intro
      console.log(this.ruleForm);

      // res.data.forEach(item => {
      //   item.message = item.message.split(';')
      // })
      // this.message.capacity = res.data
      // console.log(this.message.capacity)
    },



  },
  mounted () { }
}
</script>
<style lang="less" scoped>
.about_me {
  .header {
    display: flex;
    align-items: flex-start;
    .title {
      margin-right: 36px;
      font-size: 15px;
      color: #333;
    }
    .img {
      margin-right: 10px;
    }
  }
  .from {
    .line {
      text-align: center;
    }
  }
  .saying {
    .title {}
    .tag {
      
    }
  }
}
.page_size{display: inline-block;float: right;}
</style>
