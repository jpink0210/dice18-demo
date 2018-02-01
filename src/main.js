// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueFire from 'vuefire'
// init
Vue.use( VueRouter );

import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/pages/loginpage'
import SignUp from '@/pages/signup'
import PlayPage from '@/pages/playpage'
import count from '@/pages/count.vue';
import todo from '@/pages/todo.vue';

import App from './App'
// import router from './router'
Vue.use(VueFire);
import store from './store';

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:[
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: { requiresAuth: false },
    },
    {
      path: '/play',
      name: 'play',
      component: PlayPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/count',
      name: 'count',
      component: count,
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo,
    },
    { path: '/*', redirect: '/login' }
  ]
})
// router 執行之前會先確認的事情
router.beforeEach((to, from, next) => {
  // 如果 router 轉跳的頁面需要驗證 requiresAuth: true
  if (to.matched.some(record => {
    // console.log(record.name, record.meta.requiresAuth);
    return record.meta.requiresAuth;
  })) {
    // 如果沒有 token 
    // console.log('token:'+ store.state.token);
    if (store.state.token === '') {
      // 轉跳到 login page
      next({ path: '/login' });
    } else {
      next(); // 往下繼續執行
    }
  } else {
    next(); // 往下繼續執行
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted(){
    this.mainTc();
  },
  methods: {
    mainTc () {
      this.$store.dispatch('tc', 46);
    },
  }
})

// var firebase = require('../connections/firebase_connect');
// var fireAuth = firebase.auth();


// firebaseDb.ref().once('value', function(snapshot){
//     var dd = snapshot.val();
//     console.log(dd);
// });
