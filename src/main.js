import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "@/styles/index.scss";
import ImageItem from "@/components/ImageItem/ImageItem.vue";
import Loading from "@/components/Loading/Loading.vue";

import request from "@/api/request.js";
import requestPath from "@/api/path"


// elemnt-plus样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// v-md-editor 相关
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';


import Prism from 'prismjs';


VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
        vue: 'html',
        react: 'html'
    },
});
VueMarkdownEditor.use(createLineNumbertPlugin());
VueMarkdownEditor.use(createEmojiPlugin());

// 格式化日期
function transformDate (originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d}`
}

let app = createApp(App)

app.config.globalProperties.$request = request;//全局挂载 同vue2.x Vue.prototype.
app.config.globalProperties.$requestPath = requestPath

app.config.globalProperties.$transformDate = transformDate

app
    .component("ImageItem", ImageItem)
    .component("Loading", Loading)
    .use(store)
    .use(router)
    .use(VueMarkdownEditor)
    .use(ElementPlus, { locale })
    .mount("#app");
