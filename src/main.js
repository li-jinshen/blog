import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import "@/styles/index.scss";
import ImageItem from "@/components/ImageItem/ImageItem.vue";
import Loading from "@/components/Loading/Loading.vue";

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


createApp(App)
    .component("ImageItem", ImageItem)
    .component("Loading", Loading)
    .use(store)
    .use(router)
    .use(VueMarkdownEditor)
    .use(ElementPlus, { locale })
    .mount("#app");
