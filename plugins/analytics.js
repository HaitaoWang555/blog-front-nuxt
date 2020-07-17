import { baidu } from '~/api/analytics'
/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
  //  eslint-disable-next-line
  let _hmt = _hmt || []
  ;(function() {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?b7249af66609a1cb08d174645809dd5d'
    const s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}

export default ({ app: { router }, store }) => {
  /*
   ** 每次路由变更时进行pv统计
   */
  const site = 'https://blog.wanghaitao.club'
  router.afterEach((to, from) => {
    const url = site + to.fullPath
    baidu(url)
  })
}
