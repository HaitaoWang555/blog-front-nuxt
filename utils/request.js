import axios from 'axios'
import serveConfig from '../config/server-config'
import serveConfigProd from '../config/server-config-prod'
const isProd = process.env.NODE_ENV === 'production'
const baseUrl = isProd
  ? serveConfigProd.prodBaseURL
  : serveConfig.devProxyURL + serveConfig.baseApi
// create an axios instance
const service = axios.create({
  baseURL: baseUrl // url = base url + request url
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
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (!res.success) {
      return null
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    return null
  }
)

export default service
