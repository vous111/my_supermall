import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import toast from 'components/common/toast';

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue() // Vue实例可以作为事件总线

// 安装ElementUI插件
Vue.use(ElementUI)

// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
