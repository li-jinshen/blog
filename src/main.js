import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "@/styles/index.scss";
import ImageItem from "@/components/ImageItem/ImageItem.vue";
import Loading from "@/components/Loading/Loading.vue";

import request from "@/api/request.js";
import requestPath from "@/api/path";

// elemnt-plus样式
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";

// v-md-editor 相关
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";

import Prism from "prismjs";

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  codeHighlightExtensionMap: {
    vue: "html",
    react: "html",
  },
});
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createEmojiPlugin());

// 格式化日期
function transformDate(originVal, type) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  if (type == "simple") {
    return `${y}-${m}-${d}`;
  } else {
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
}

// 判断非空
function isNull(str) {
  if (str == "") return true;
  var reg = "^[ ]+$";
  var re = new RegExp(reg);
  return re.test(str);
}

// 数组排序
function sortRule(a, b) {
  return a.sort - b.sort;
}

// 防抖
function debounce(fn, wait) {
  var timer = null;
  return function() {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, wait);
  };
}

let app = createApp(App);

app.config.globalProperties.$request = request; //全局挂载 同vue2.x Vue.prototype.
app.config.globalProperties.$requestPath = requestPath;

app.config.globalProperties.$transformDate = transformDate;
app.config.globalProperties.$isNull = isNull;
app.config.globalProperties.$sortRule = sortRule;
app.config.globalProperties.$debounce = debounce;

app
  .component("ImageItem", ImageItem)
  .component("Loading", Loading)
  .use(store)
  .use(router)
  .use(VueMarkdownEditor)
  .use(ElementPlus, { locale })
  .mount("#app");
