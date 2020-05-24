import request from '@/utils/request'
/**
 * 查询归档
 */
export function archiveList() {
  return request({
    url: '/archive/list',
    method: 'get'
  })
}
