// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BeAlert from './beAlert/BeAlert.js' 
import Vue from 'vue'
import i18n from './locales' //多语音
import store from './store'  //状态管理
import App from './App'
import router from './router'  //路由
import '@/assets/css/style.css' 
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'


import {post,get} from './api/http'

Vue.prototype.$BeAlert = BeAlert;

Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$api ='/api'
Vue.prototype.$loginApi = '/loginapi'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  store,
  router,
  components: { App },
  template: '<App/>'
})
