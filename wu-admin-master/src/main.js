// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store/index'
import Root from './Root'
import router from './router/index.js'
import ElementUI from 'element-ui';
import axios from '@/http.js';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/reset.css'
import '@/assets/js/prototype.js'
import VueQuillEditor from 'vue-quill-editor'; //富文本编辑器
import VueClipboard from 'vue-clipboard2' //剪切板功能
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.use(VueClipboard)
Vue.prototype.$http = axios
Vue.prototype.$EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  components: { Root },
  template: '<Root/>'
})
