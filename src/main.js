import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import "@/assets/js/common.js";
import BaiduMap from "vue-baidu-map";
import "@/assets/js/flexibleScreen.js";

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key
  ak: "WestGzMBGDQHxb9GBf1bGngfsM7FOrBh"
});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

Vue.filter("formatAbs", function(value) {
  return Math.abs(value);
});

Vue.filter("toFixed", function(value, digits) {
  // return Math.floor(value * 100) / 100;
  // return value.toFixed(digits);
  // digits = digits || 100;
  // digits默认保留两位小数 0=>整数 1=>保留一位小数 2=>保留两位小数
  digits = digits !== undefined ? 10 ** digits : 100;
  return Math.round(value * digits) / digits;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
