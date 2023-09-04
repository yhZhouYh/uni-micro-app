/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-09-01 18:02:35
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-02 16:53:40
 * @FilePath: /template-uni-vue3/src/store/setup.js
 */
import { createPinia } from 'pinia'
import Persist from 'pinia-plugin-persist-uni'

let piniaInstance = null

function pinia() {
  if (piniaInstance == null) {
    piniaInstance = createPinia()
    // pinia插件只在 app.install里执行时才会注册,遂手动添加
    piniaInstance._p && !piniaInstance._p.length && piniaInstance._p.push(Persist)
    // piniaInstance.use(Persist)
  }

  return piniaInstance
}

export default pinia
