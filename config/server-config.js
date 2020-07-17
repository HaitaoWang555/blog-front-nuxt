const serveConfig = {}
serveConfig.proxy = {
  port: 3000
}
serveConfig.blogName = '王海涛的个人博客网站'
serveConfig.devBaseURL = 'http://localhost:3000'
serveConfig.devProxyURL = 'http://localhost:8085/'
serveConfig.baseApi = '/api/portal'
export default serveConfig
