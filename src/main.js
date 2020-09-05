// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store/store'
import fastclick from 'fastclick'
import VueCookies from 'vue-cookies'
import{getChannge} from './common/js/common.js'

let Base64 = require('js-base64').Base64;
Vue.config.productionTip = false

fastclick.attach(document.body)

require ('./common/css/reset.css')
require ('./common/theme/default/css/index.css')
require('./common/js/rem.js')


Vue.use(VueAxios,axios,Vuex,VueCookies)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['X-REQUESTED-SO-TOKEN'] = $cookies.get(Base64.decode(getChannge('channel')) + '_loginToken');
axios.defaults.baseURL = process.env.API_ROOT

router.beforeEach((to, from, next) => {//每个路由执行守卫
  document.title = to.meta.title  //title
  if (to.meta.requireAuth) {
    var token =  $cookies.get(Base64.decode(getChannge('channel')) + '_loginToken')
    console.log(token)
    if (token) { 
      next();
    }else{
      window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ Base64.decode(getChannge('channel')) + "&backurl="+ window.location.href //+ to.fullPath
    }
  }else{
    next();
  }
});

// http response inteceptor，当后端接口让用户重新登录
axios.interceptors.response.use(
  response => {
    if(response.data.msg=='请重新登录!'){
        window.location.href = process.env.PASSPORT_ROOT+"/login?channel="+ Base64.decode(getChannge('channel')) + "&backurl="+ window.location.href //+ to.fullPath
    }else{
      return response;
    }
    return response;
  },
  error => {
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
