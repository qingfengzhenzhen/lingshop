import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import zh from './i18n/langs/zh.json' // 中文包
import tw from './i18n/langs/tw.json' // 中文包

// vant按需引入
import './vantModule.js'
import 'vant/lib/index.css';
import { Toast } from 'vant';

Vue.use(VueI18n)
//实例化vue-i18n
//语言包切换，
const i18n = new VueI18n({
//   // 从本地存储中取，如果没有默认为中文，
//   // 这样可以解决切换语言后，没记住选择的语言，刷新页面后还是默认的语言
locale: localStorage.getItem('lang')||'zh', // 定义默认语言为中文简体
  // messages: {
  //     zh: localStorage.getItem("lang_zh")
  //       ? JSON.parse(localStorage.getItem("lang_zh"))
  //       : zh,
  //     tw: localStorage.getItem("lang_tw")
  //       ? JSON.parse(localStorage.getItem("lang_tw"))
  //       : tw
  // }
  messages:{
    zh,tw
  }
})


window.$http ="http://8.129.38.70:8007"

// Vue.prototype.window.$http.setI18n(i18n);
Vue.directive('error', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.addEventListener('error',()=>{
      el.src="./imgerror.png"
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
// app 返回键优化

var first = null;
function add() {
  //首次按键，提示‘再按一次退出应用’
  if (!first) {
      first = new Date().getTime();
      Toast.success('再次点击退出应用');
      setTimeout(function() {
          first = null;
          plus.key.removeEventListener('backbutton',add,false)
      }, 1000);
  } else {
      if (new Date().getTime() - first < 1500) {
          plus.runtime.quit();
      }
  }
}

document.addEventListener('plusready', function() {
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener('backbutton', function() {
      webview.canBack(function(e) {
          if(e.canBack) {
              webview.back();
          } else {
              //webview.close(); //hide,quit
              //plus.runtime.quit();
              //首页返回键处理
              //处理逻辑：1秒内，连续两次按返回键，则退出应用；
              plus.key.addEventListener('backbutton', add, false);
          }
      })
  });
});


