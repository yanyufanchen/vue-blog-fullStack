<template>
  <div class="home_content">
    hello world aPlus:{{aPlus}} aDouble:{{aDouble}}
    <input type="text"
           placeholder="a"
           v-model="a">
    <colorPickerDesk></colorPickerDesk>
    <button @click="aa">点击改变aplus的值</button>
    <el-button type="primary">主要按钮</el-button>
    ______________________________________________
    <p>firstName值: {{firstName}}</p>
    <p>fullName值: {{fullName}}</p>
    <button @click="ClickCeshi">点击改变fullName的值</button>
  </div>
</template>
<script>
import { } from '@/api'
import { log } from 'util';
import axios from 'axios'
export default {
  data () {
    return {
      a: 1,
      firstName: 'Foo'
    }
  },
  methods: {
    ClickCeshi () {
      this.fullName = 'fullName的新值'
    },
    aa: function () {
      this.aPlus = 3
    },
  },
  computed: {
    aDouble: function () {
      return this.a * 2
    },

    aPlus: {
      get: function () {
        console.log(1111);

        return Number(this.a) + 1
      },
      set: function (v) {
        this.a = v - 1
        console.log(v, this.a);

      }
    },
    fullName: {
      get: function () {
        console.log('调用了getter属性')
        return '***' + this.firstName + '***'
      },
      set: function (newValue) {
        console.log('调用了settter属性')
        console.log(newValue)
        this.firstName = newValue
      }
    }
  },
  async created () {
    const res = await axios.get('https://d3ca2bf9-a00e-476d-9447-92a65ac1a70a.bspapp.com/http/login')
    console.log(this.$store.state.themeColor, 'index-vuex');
    console.log(res, '111');
  },
  mounted () {
    // this.aPlus.set(3)
  }
}
</script>

<style lang="less" scoped>

</style>
