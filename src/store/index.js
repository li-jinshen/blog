import { createStore } from 'vuex'
import request from '../api/request'
import requestPath from '../api/path'

export default createStore({
  state: {
    loginStatus: false, // 登录状态
    hotRecommended: [],//热门推荐
    recentNews: [], // 最新动态
  },
  mutations: {
    // 更新登录状态
    updateLoginStatus (state, status) {
      state.loginStatus = status
      if (!state.loginStatus) {
        localStorage.removeItem("userInfo")
      }
    },
    // 更新热门推荐的数据
    updateHotRecommended (state, list) {
      state.hotRecommended = []
      state.hotRecommended.push(...list)
    },
    upDateRecentNews (state, list) {
      state.recentNews = []
      state.recentNews.push(...list)
    }
  },
  actions: {
    // 获取点击排行数据
    getRank ({ commit }) {
      request({
        method: 'get',
        url: requestPath.getRank + '?limit=10'
      })
        .then((res) => {
          let { data } = res
          commit('updateHotRecommended', data)
        })
        .catch((error) => {
          console.log('获取文章排行错误', error)
        })
    },
    // 获取最近更新
    getSingleArticle ({ commit }) {
      request({
        method: 'get',
        url: requestPath.getSingleArticle + '?limit=10&page=1&sort=1'
      })
        .then((res) => {
          let { data } = res
          commit('upDateRecentNews', data)
        })
        .catch((error) => {
          console.log('获取最近动态错误', error)
        })
    }
  },
  getters: {
    // 获取热门推荐
    getHotRecommended: state => state.hotRecommended,
    // 获取最新动态
    getRecentNews: state => state.recentNews
  },
  modules: {
  }
})
