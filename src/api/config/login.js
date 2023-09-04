/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-09-01 17:59:29
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 17:59:34
 * @FilePath: /template-uni-vue3/src/api/config/login.js
 */
import { http } from '~/utils/request/index'

export function userLogin(data) {
  return http.request({
    method: 'POST',
    url: '/api/v2/wechat/login',
    data,
    custom: {
      noAuth: true,
    },
  })
}

export function updateMobile(data) {
  return http.request({
    method: 'PUT',
    url: '/api/v2/wechat/user/mobile',
    data,
  })
}
// 获取当前用户信息
export function userCurrent(data) {
  return http.request({
    method: 'GET',
    url: '/api/v2/users/wechat',
    data,
  })
}
