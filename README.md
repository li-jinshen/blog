# blog

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Vue3 安装 tailwind

```bash
vue add tailwind
```

如果报错

```bash
Syntax Error: Error: PostCSS plugin tailwindcss requires PostCSS 8.
```

解决办法（先卸载 再安装）

```bash
npm uninstall tailwindcss postcss autoprefixer
npm install tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

在 main.ts 中引入 assets 文件夹生成的 tailwind.css

```
import "./assets/tailwind.css"
```

## 博客后台管理面板

### UI组件

- Element-plus

### 模块设计

- 文章管理（article）
  - 文章发表、修改、删除
  - v-md-editor编辑器：文章编写，文章展示
- 公告(announcement)
  - 发布、删除、修改
- 个人信息(archives)
  - 修改
- 主页管理
  - 模块添加、删除、编辑
  - 各模块的信息的添加、删除、修改
  - 属性定义：
    - type：模块类型(实用工具、影音娱乐.....)
    - picture：图片
    - describe：描述
    - link：链接
    - ItemType：子项类型(属性值：链接[link]、文本[text])
- 浏览量管理(browse)
  - 查询、统计、筛选
- 留言管理(message)
  - 发布、回复、删除
- 评论管理(comments)
  - 发布、回复、删除