import { createRouter, createWebHistory } from 'vue-router'
// import store from "../store/index";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/blog/home",
  },
  {
    path: "/blog/home",
    name: "Home",
    component: Home,
    redirect: "/blog/home/article",
    meta: {
      pageIndex: 1,
    },
    children: [
      {
        path: "article",
        name: "Article",
        component: () => import("../views/home/pages/Article.vue"),
        meta: {
          pageIndex: 2,
        },
      },
      {
        path: "music",
        name: "Music",
        component: () => import("../views/home/pages/Music.vue"),
        meta: {
          pageIndex: 3,
        },
      },
      {
        path: "front",
        name: "Front",
        component: () => import("../views/home/pages/Front.vue"),
        meta: {
          pageIndex: 4,
        },
      },
      {
        path: "browser",
        name: "Browser",
        component: () => import("../views/home/pages/Browser.vue"),
        meta: {
          pageIndex: 5,
        },
      },
      {
        path: "tool",
        name: "Tool",
        component: () => import("../views/home/pages/Tool.vue"),
        meta: {
          pageIndex: 6,
        },
      },
      {
        path: "resources",
        name: "Resources",
        component: () => import("../views/home/pages/Resources.vue"),
        meta: {
          pageIndex: 7,
        },
      },
      {
        path: "navigation",
        name: "Navigation",
        component: () => import("../views/home/pages/Navigation.vue"),
        meta: {
          pageIndex: 8,
        },
      },
      {
        path: "search",
        name: "Search",
        component: () => import("../views/home/pages/Search.vue"),
        meta: {
          pageIndex: 9,
        },
      },
      {
        path: "link",
        name: "Link",
        component: () => import("../views/home/pages/Link.vue"),
        meta: {
          pageIndex: 9,
        },
      },
    ],
  },
  {
    path: "/blog/index",
    name: "Index",
    component: () => import("../views/Index.vue"),
    redirect: "/blog/index/common",
    meta: {
      pageIndex: 10,
    },
    children: [
      {
        path: "common",
        name: "Common",
        component: () => import("../views/index/pages/Common.vue"),
        redirect: "/blog/index/common/list",
        children: [
          {
            path: "list",
            name: "List",
            component: () => import("../views/index/pages/List.vue"),
          },
          {
            path: "comment",
            name: "Comment",
            component: () => import("../views/index/pages/Comment.vue"),

          },
          {
            path: "archive",
            name: "Archive",
            component: () => import("../views/index/pages/Archive.vue"),

          },
        ]
      },
      {
        path: "article",
        name: "IndexArticle",
        component: () => import("../views/index/pages/Article.vue"),
      },

    ],
  },
  {
    path: "/blog/admin",
    redirect: "/blog/admin/management",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "management",
        name: "Management",
        component: () => import("../views/admin/Management.vue"),
        redirect: "/blog/admin/management/archives",
        children: [
          {
            path: "archives",
            name: "Archives",
            component: () => import("../views/admin/pages/Archives.vue"),
          },
          {
            path: "module",
            name: "Module",
            component: () => import("../views/admin/pages/Module.vue"),
          },
          {
            path: "article",
            name: "ManaArticle",
            component: () => import("../views/admin/pages/Article.vue"),
          },
          {
            path: "announcement",
            name: "Announcement",
            component: () => import("../views/admin/pages/Announcement.vue"),
          }, {
            path: "message",
            name: "Message",
            component: () => import("../views/admin/pages/Message.vue"),
          }, {
            path: "comment",
            name: "AdminComment",
            component: () => import("../views/admin/pages/Comment.vue"),
          }, {
            path: "browse",
            name: "Browse",
            component: () => import("../views/admin/pages/Browse.vue"),
          }
        ]
      }
    ]
  },
  {
    path: "/blog/markdown",
    component: () => import("../views/admin/Markdown.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// router.beforeEach((to, from) => {
//   if (to.meta.pageIndex && from.meta.pageIndex) {
//     to.meta.pageIndex > from.meta.pageIndex
//       ? store.commit("updateHomeFlag", true)
//       : store.commit("updateHomeFlag", false);
//   }
//   return true;
// });

export default router
