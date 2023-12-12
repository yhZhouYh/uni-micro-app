/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-08-20 13:21:16
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-08-21 17:16:21
 * @FilePath: /krafthein-mpm/src/hooks/usePublicPath/index.ts
 */
import type { App } from 'vue'
import { getOSSToken } from '~/api/config/upload'
import { useLoginStore } from '~/store'
import pinia from '~/store/setup'

const { info } = useLoginStore(pinia())

const publicPath = ref('')

let ossTokenPromise: Promise<any> | null = null

export function initPublicPath(app: App) {
  const unwatch = watch(() => info.auth_token, async (nv) => {
    try {
      if (!publicPath.value && nv && !ossTokenPromise) {
        ossTokenPromise = getOSSToken()
        const res = await ossTokenPromise
        publicPath.value = res[res.select_cloud].cdnHost + res[res.select_cloud]?.container_name ?? ''
      }
    }
    catch (error) {
      console.error(error)
    }
    if (!app)
      return

    app.config.globalProperties.$publicPath = publicPath
    if (publicPath.value)
      unwatch()
  }, {
    immediate: true,
  })
}
