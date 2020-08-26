import Vue from 'vue'

import * as filters from './filters'
import { highlight } from './highlight'

// eslint-disable-next-line import/namespace
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
Vue.directive('highlight', highlight)

function showTips(res) {
  const obj = {}
  obj.snackbar = true
  if (typeof res === 'string') {
    obj.tips = res
    obj.color = 'error'
  } else {
    obj.tips = res.message
    obj.color = res.code === 200 ? 'success' : 'error'
  }
  this.$store.commit('message/SET_SNACKBAR', obj)
}
Vue.prototype.$tips = showTips
