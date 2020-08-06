import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入v-charts组件
import VCharts from 'v-charts'
Vue.use(VCharts)

import './api/index.js'
import Breadcrumb from './components/common/Breadcrumb.vue'
Vue.component('Breadcrumb', Breadcrumb)
// 后台主题色工具
import colorPicker from './components/common/colorPicker.vue'
Vue.component('colorPicker', colorPicker)
// 前台主题色工具
import colorPickerDesk from './components/common/colorPickerDesk.vue'
Vue.component('colorPickerDesk', colorPickerDesk)
// import TreeTable from 'vue-table-with-tree-grid' //树状分支组件
// Vue.component('tree-table', TreeTable)

import time from './util/time.js' // 时间戳转时间字符串 formatTime(time,'YYYY-MM-DD') 时间字符串转时间戳transformTimeStr('YYYY-MM-DD')
Vue.prototype.VTime = time

import moment from 'moment'
Vue.component('moment', moment)
Vue.filter('moment', function (originVal, format = 'YYYY-MM-DD hh:mm:ss') { // 'YYYY-MM-DD' 'YYYY-MM:DD hh:mm:ss'
  return moment(originVal).format(format);
})

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
