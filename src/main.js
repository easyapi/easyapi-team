import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iView from "iview";
import axios from "axios";
import moment from "moment";
import VueClipboard from "vue-clipboard2";

import "iview/dist/styles/iview.css";
import "./assets/iconfont/iconfont.css";

Vue.use(iView);
Vue.use(VueClipboard);

Vue.prototype.$ajax = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
