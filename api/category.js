import request from '@/utils/request'
/**
 * 查询分类关联文章
 */
export function categoryArticleList() {
  return request({
    url: '/category/list',
    method: 'get'
  })
}
