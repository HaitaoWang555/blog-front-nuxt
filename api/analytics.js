import request from '@/utils/request'

/**
 * 百度普通收录推送接口
 */
export function baidu(url) {
  return request({
    url: '/analytics/baidu',
    method: 'post',
    params: {
      url
    }
  })
}
