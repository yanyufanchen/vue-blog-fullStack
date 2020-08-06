import axios from 'axios'
// 引入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:9091'
// 设置请求头
axios.interceptors.request.use(config => {
  //当进入request拦截器，表示发送了请求，我们就开启进度条
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
}, function (err) {
  // #1.3对请求错误做点什么
  console.log(err)
})

// 登录
export const login_api = (params) => {
  return axios.post('login', params)
}
// about_me栏
// 简介
export const aboutMeMessageApi = (params) => {
  return axios.get('/about_me/get_message', params)
}

// 我的详细信息
export const aboutMeinformationApi = (params) => {
  return axios.get('/about_me/get_Me_information', params)
}

// skill栏
// 我的技能数据
export const skillEchatApi = (params) => {
  return axios.get('/skill/get_skillEchart', params)
}

// project栏
// 我的项目
export const projectAllApi = (params) => {
  return axios.post('/project/get_projectList', params)
}
// 我的项目分类
export const projectCateApi = (params) => {
  return axios.get('/project/get_projectCate', params)
}

// work栏
// 我的工作经历
export const getMyjobApi = (params) => {
  return axios.get('/work/get_Myjob', params)
}

// post栏
// 我的文章列表
export const getPostListApi = (params) => {
  return axios.post('/post/get_postList', params)
}
// 我的文章分类列表
export const getPostCateApi = (params) => {
  return axios.get('/post/get_postCate', params)
}
