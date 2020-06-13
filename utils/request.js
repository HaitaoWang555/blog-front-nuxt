import axios from 'axios'
import serveConfig from '../config/server-config'
import serveConfigProd from '../config/server-config-prod'
const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd ? serveConfigProd.prodBaseURL : serveConfig.baseApi
const proxy = isProd ? serveConfigProd.proxy : serveConfig.proxy
// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  proxy
})
service.defaults.headers.post['Content-Type'] =
  'application/json, charset=UTF-8'
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    return config
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line no-console
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      return null
    } else {
      return res
    }
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log('err' + error) // for debug
    return null
  }
)

export default service
