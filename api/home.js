import request from '@/utils/request'
/**
 * 查询首页文章列表
 * @param {Number} query.page
 * @param {Number} query.pageSize
 */
export function articleList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
