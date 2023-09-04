/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-09-01 18:00:31
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 18:00:45
 * @FilePath: /template-uni-vue3/src/api/config/integral.js
 */
import { http } from '~/utils/request/index'

// 会员信息服务-获取当前用户
export function getMembersCurrent() {
  return http.request({
    method: 'GET',
    url: '/api/v2/members/current',
  })
}
