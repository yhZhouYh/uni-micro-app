/*
 * @Author: zxx
 * @Description:跳转其他页面的方法，包括跳转tabtar页面
 * @Date: 2023-09-04 09:51:20
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 11:40:46
 * @FilePath: /template-uni-vue3/src/utils/common/goskip.js
 */
import router from '@/router'

/**
 * @param1 '跳转链接'
 */
export default function goskip(url) {
  const isPathExist = router.routes.some(pathObj => pathObj?.path === `/${url?.split('?')[0]}`)
  if (isPathExist) {
    if (
      url === 'pages/index/index'
      || url === 'pages/kitchen/index'
      || url === 'pages/newcamp/index'
      || url === 'pages/shopping/index'
      || url === 'pages/user/index'
    ) {
      uni.switchTab({
        url: `/${url}`,
      })
    }
    else {
      router.push({
        path: url,
      })
    }
  }
  else {

  }
}
