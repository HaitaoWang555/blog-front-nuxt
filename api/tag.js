import request from '@/utils/request'
/**
 * 查询标签关联文章
 */
export function tagArticleList() {
  return request({
    url: '/tag/list',
    method: 'get'
  })
}
