/*
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-09-01 17:14:10
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 17:14:14
 * @FilePath: /template-uni-vue3/src/store/login/index.ts
 */
import { defineStore } from 'pinia'

function store() {
  const state = reactive({

    loginPromise: {
      value: Promise.resolve(),
    },
    info: {
      APP_ID: '',
      auth_token: '',
      ticket: '',
      open_id: '',
      user_id: '',
      user_info: {},
      login: false,
      showPrivacy: true,
      privacyContractName: '',
    },
  })
  return {
    ...toRefs(state),
  }
}
export const useLoginStore = defineStore('login', store, {
  persist: {
    enabled: true,
  },
})
