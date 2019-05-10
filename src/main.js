// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from './api/fetch'
Vue.prototype.$ajax = axios
import './assets/styles/gobal.styl'
import './assets/styles/a-icon-font.css'

// icomoon
import './assets/styles/icomoon/style.css'
import './assets/styles/fontello/fontello.css'

// --
import VueBus from 'vue-bus'
Vue.use(VueBus)

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView)

Vue.config.productionTip = false

Array.prototype.rmIndex = function (index) {
  this.splice(index, 1)
  return this
}

//--
Vue.prototype.$getCookieObj = function (cookie) {
  let v = cookie.split('; ')
  // console.log(v)
  let _obj = {}
  for(let i = 0; i < v.length; ++i) {
      let k = v[i].split('=')
      _obj[k[0]] = k[1]
  }
  return _obj
}

/**
 * custom filters
 */
Vue.filter('dateFormat', function (val) {
  let t = null
  if (val) t = new Date(val)
  else return '--'

  return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`
})


/**
 * loading control
 */
Vue.prototype.$loadingStart = function() {
  let loadingW = document.getElementById('loading')
  loadingW.style.display = 'block'
  setTimeout(() => {
      loadingW.classList.remove('hide')
  }, 200)
}

Vue.prototype.$loadingEnd = function() {
  let loadingW = document.getElementById('loading')
  loadingW.classList.add('hide')
  setTimeout(() => {
      loadingW.style.display = 'none'
  }, 500)
}


/**
 * Loading Bar setting
 */
iView.LoadingBar.config({
  color: '#219244',
  height: 3
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach(route => {
    iView.LoadingBar.finish();
});


// ea-dialog
import EaDialog from './components/common/ea-dialog/EaDialog.vue'
Vue.component('ea-dialog', EaDialog)

// ea-button
import EaButton from './components/common/ea-button/EaButton.vue'
Vue.component('ea-button', EaButton)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
