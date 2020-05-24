import Vue from 'vue'

import * as filters from './filters'

// eslint-disable-next-line import/namespace
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
