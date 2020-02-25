import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import ViewUI from "view-design";
import axios from "./api/fetch";
import VueBus from "vue-bus";

import 'core-js';
import "view-design/dist/styles/iview.css";

import "./assets/styles/gobal.styl";
import "./assets/styles/a-icon-font.css";
// icomoon
import "./assets/styles/icomoon/style.css";
import "./assets/styles/fontello/fontello.css";

Vue.use(ViewUI);
Vue.use(VueBus);

Vue.prototype.$ajax = axios;

Array.prototype.rmIndex = function (index) {
  this.splice(index, 1);
  return this;
};

/**
 * loading control
 */
Vue.prototype.$loadingStart = function () {
  let loadingW = document.getElementById("loading");
  loadingW.style.display = "block";
  setTimeout(() => {
    loadingW.classList.remove("hide");
  }, 200);
};

Vue.prototype.$loadingEnd = function () {
  let loadingW = document.getElementById("loading");
  loadingW.classList.add("hide");
  setTimeout(() => {
    loadingW.style.display = "none";
  }, 500);
};
/**
 * custom filters
 */
Vue.filter("dateFormat", function (val) {
  let t = null;
  if (val) t = new Date(val);
  else return "--";

  return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}`;
});

/**
 * Loading Bar setting
 */
ViewUI.LoadingBar.config({
  color: "#219244",
  height: 3
});
router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start();
  next();
});
router.afterEach(route => {
  ViewUI.LoadingBar.finish();
});

//自定义组件
// ea-dialog
import EaDialog from "./components/common/ea-dialog/EaDialog.vue";

Vue.component("ea-dialog", EaDialog);

// ea-button
import EaButton from "./components/common/ea-button/EaButton.vue";

Vue.component("ea-button", EaButton);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
