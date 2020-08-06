import Vue from 'vue'
import Router from 'vue-router'
// admin
const adminLogin = () => import( /* webpackChunkName:"login_index_Home" */ './components/Login.vue')
const adminIndex = () => import( /* webpackChunkName:"login_index_Home" */ './components/Index.vue')
const adminHome = () => import( /* webpackChunkName:"login_index_Home" */ './components/Home/Home.vue')

const adminAbout_me = () => import( /* webpackChunkName:"About_me_Skill" */ './components/Me/About_me.vue')
const adminSkill = () => import( /* webpackChunkName:"About_me_Skill" */ './components/Me/Skill.vue')

const adminProject = () => import( /* webpackChunkName:"contentMag" */ './components/ContentMag/Project.vue')
const adminPost = () => import( /* webpackChunkName:"contentMag" */ './components/ContentMag/Post.vue')

const adminPorsion = () => import( /* webpackChunkName:"FansMag" */ './components/FansMag/Porsion.vue')
const adminComment = () => import( /* webpackChunkName:"FansMag" */ './components/FansMag/Comment.vue')

const adminAccount = () => import( /* webpackChunkName:"System" */ './components/System/Account.vue')
const adminDeskSet = () => import( /* webpackChunkName:"System" */ './components/System/DeskSet.vue')

// desk
const Index = () => import( /* webpackChunkName:"login_index_Home" */ './deskComponents/Index.vue')



Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/index'
    }, 
    {
      path: '/admin',
      redirect: '/login',
      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      component: adminLogin,
      // meta: { requiresAuth: true }
    },

    {
      path: '/admin/index',
      component: adminIndex,
      meta: { requiresAuth: true },
      children: [{
          path: '/admin/index',
          redirect: '/admin/home',
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/home',
          component: adminHome,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/about_me',
          component: adminAbout_me,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/skill',
          component: adminSkill,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/project',
          component: adminProject,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/post',
          component: adminPost,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/comment',
          component: adminComment,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/porsion',
          component: adminPorsion,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/account',
          component: adminAccount,
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/deskset',
          component: adminDeskSet,
          meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/index',
      component: Index
      // children: [{
      //     path: '/admin/index',
      //     redirect: '/admin/home'
      //   },
      //   {
      //     path: '/admin/home',
      //     component: adminHome
      //   },
      //   {
      //     path: '/admin/about_me',
      //     component: adminAbout_me
      //   },
      //   {
      //     path: '/admin/skill',
      //     component: adminSkill
      //   },
      //   {
      //     path: '/admin/project',
      //     component: adminProject
      //   },
      //   {
      //     path: '/admin/post',
      //     component: adminPost
      //   },
      //   {
      //     path: '/admin/comment',
      //     component: adminComment
      //   },
      //   {
      //     path: '/admin/porsion',
      //     component: adminPorsion
      //   },
      // ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to,'进入全局守卫');
  let tokenstr = window.sessionStorage.getItem('token')
  //判断访问的页面是否有requiresAuth字段
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to,'需要检测登录');
    // 如果未登录，则跳转到登录页面
    
    // 否则正常跳转
    if (!tokenstr) {
      console.log('没有登录');
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    // 如果请求'login'页面
    if(to.path=='/login'){
      console.log('主动请求login');
      // 验证tokenstr合法性，后期优化
      if(tokenstr){
        console.log(tokenstr,'验证tokenstr合法性');
        next({
          path: '/admin/index',
          // query: { redirect: to.fullPath }
        })
      }
    }
    
    next() // 确保一定要调用 next()
  }
})


export default router
