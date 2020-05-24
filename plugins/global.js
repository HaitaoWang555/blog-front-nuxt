import Vue from 'vue'

import * as filters from './filters'
import { highlight } from './highlight'

// eslint-disable-next-line import/namespace
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
Vue.directive('highlight', highlight)
