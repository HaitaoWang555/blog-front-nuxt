import request from '@/utils/request'

/**
 * 笔记树
 */
export function treeList() {
  return request({
    url: '/note/treeList',
    method: 'get'
  })
}

/**
 * 笔记内容
 */
export function getContent(id) {
  return request({
    url: '/note/content/' + id,
    method: 'get'
  })
}
