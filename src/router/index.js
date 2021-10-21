import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index";
import Home from "../views/Home.vue";
import createMessage from '@/components/message/message.js'
const routes = [
  {
    path: "/",
    redirect: "/blog/home",
    meta: {
      requiresAuth: false
    },
  },
  {
    path: "/blog/home",
    name: "Home",
    component: Home,
    redirect: "/blog/home/article",
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: "article",
        name: "Article",
        component: () => import("../views/home/pages/Article.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "music",
        name: "Music",
        component: () => import("../views/home/pages/Music.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "front",
        name: "Front",
        component: () => import("../views/home/pages/Front.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "browser",
        name: "Browser",
        component: () => import("../views/home/pages/Browser.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "tool",
        name: "Tool",
        component: () => import("../views/home/pages/Tool.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "resources",
        name: "Resources",
        component: () => import("../views/home/pages/Resources.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "navigation",
        name: "Navigation",
        component: () => import("../views/home/pages/Navigation.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "search",
        name: "Search",
        component: () => import("../views/home/pages/Search.vue"),
        meta: {
          requiresAuth: false
        },
      },
      {
        path: "link",
        name: "Link",
        component: () => import("../views/home/pages/Link.vue"),
        meta: {
          requiresAuth: false
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
      requiresAuth: false
    },
    children: [
      {
        path: "common",
        name: "Common",
        component: () => import("../views/index/pages/Common.vue"),
        redirect: "/blog/index/common/list",
        meta: {
          requiresAuth: false
        },
        children: [
          {
            path: "list",
            name: "List",
            component: () => import("../views/index/pages/List.vue"),
            meta: {
              requiresAuth: false
            },
          },
          {
            path: "comment",
            name: "Comment",
            component: () => import("../views/index/pages/Comment.vue"),
            meta: {
              requiresAuth: false
            },

          },
          {
            path: "archive",
            name: "Archive",
            component: () => import("../views/index/pages/Archive.vue"),
            meta: {
              requiresAuth: false
            },

          },
        ]
      },
      {
        path: "article",
        name: "IndexArticle",
        component: () => import("../views/index/pages/Article.vue"),
        meta: {
          requiresAuth: false
        },
      },

    ],
  },
  {
    path: "/blog/admin",
    redirect: "/blog/admin/management",
    component: () => import("../views/Admin.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "management",
        name: "Management",
        component: () => import("../views/admin/Management.vue"),
        redirect: "/blog/admin/management/archives",
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "archives",
            name: "Archives",
            component: () => import("../views/admin/pages/Archives.vue"),
            meta: {
              requiresAuth: true
            },
          },
          {
            path: "module",
            name: "Module",
            component: () => import("../views/admin/pages/Module.vue"),
            meta: {
              requiresAuth: true
            },
          },
          {
            path: "article",
            name: "ManaArticle",
            component: () => import("../views/admin/pages/Article.vue"),
            meta: {
              requiresAuth: true
            },
          },
          {
            path: "announcement",
            name: "Announcement",
            component: () => import("../views/admin/pages/Announcement.vue"),
            meta: {
              requiresAuth: true
            },
          }, {
            path: "message",
            name: "Message",
            component: () => import("../views/admin/pages/Message.vue"),
            meta: {
              requiresAuth: true
            },
          }, {
            path: "comment",
            name: "AdminComment",
            component: () => import("../views/admin/pages/Comment.vue"),
            meta: {
              requiresAuth: true
            },
          }, {
            path: "browse",
            name: "Browse",
            component: () => import("../views/admin/pages/Browse.vue"),
            meta: {
              requiresAuth: true
            },
          }
        ]
      }
    ]
  },
  {
    path: "/blog/markdown",
    component: () => import("../views/admin/Markdown.vue"),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/blog/login",
    component: () => import("../views/Login.vue"),
    meta: {
      requiresAuth: false
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.loginStatus) {
      next()
    } else {
      createMessage({
        type: 'error',
        message: '登录后才有权限访问，请先登录'
      })
      setTimeout(() => {
        router.push({ path: "/blog/login" })
      }, 1000)
    }
  } else {
    next()
  }
});

export default router
