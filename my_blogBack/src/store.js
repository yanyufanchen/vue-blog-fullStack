import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    themeColor: '#409EFF' // 后台element默认主题色
  },
  mutations: {
    // 编辑后台在线主题色
    editThemeColor(state,color){
      state.themeColor=color
      console.log(state.themeColor);
    }
  },
  actions: {

  }
})
