import request from '@/utils/request'
/**
 * 查询首页文章列表
 * @param {Number} query.page
 * @param {Number} query.pageSize
 */
export function articleList(query) {
  query.pageNum = query.page
  return request({
    url: '/home/list',
    method: 'get',
    params: query
  })
}
