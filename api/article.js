import request from '@/utils/request'
/**
 * 查询文章
 * @param {Number} query.id
 */
export function article(query) {
  return request({
    url: '/article/getOne',
    method: 'get',
    params: query
  })
}
