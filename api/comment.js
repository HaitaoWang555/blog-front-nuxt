import request from '@/utils/request'
/**
 * 查询评论列表
 * @param {Number} id
 */
export function commentList(id) {
  return request({
    url: '/comment/list/' + id,
    method: 'get'
  })
}

/**
 * 添加评论
 * @param {} comment
 */
export function commentCreat(comment) {
  return request({
    url: '/comment/create',
    method: 'post',
    data: comment
  })
}
