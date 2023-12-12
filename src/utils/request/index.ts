/* eslint-disable no-useless-catch */
import Request from 'luch-request'
import { HTTP_STATUS_CODE } from './constants'
import pinia from '~/store/setup'
import { useLoadingStore, useLoginStore } from '~/store'
import { appLogin, onLogoutLogin, setUserInfo } from '~/utils/login'

// 在app.use pinia之前调用了pinia里的store,要先初始化pinia
const { addLoadingCounter, subLoadingCounter } = useLoadingStore(pinia())
// useLoginStore(pinia())

let refreshPromise: Promise<any> | null = null // 401 重新获取
const clearPromise = () => refreshPromise = null

const http = new Request()

http.setConfig((config: any) => {
  config.baseURL = import.meta.env.VITE_API_BASE
  config.timeout = 60000
  config.header = {
    'Content-Type': 'application/json',
  }
  return config
})

http.interceptors.request.use(async (config) => {
  // console.log('请求拦截器', config)

  // get传参与post一致都是传data
  if (config.method === 'GET')
    config.params = config.data
  // 等待app.vue login promise结束
  const { loginPromise, info } = useLoginStore(pinia())

  if (!config?.custom?.noAuth)
    loginPromise && loginPromise.value && await loginPromise.value

  addLoadingCounter()
  if (info.auth_token) {
    config.header && (config.header['X-Token'] = `${info.auth_token}`)
    config.header && (config.header.openId = `${info.open_id}`)
  }
  return config
}, (config) => {
  subLoadingCounter()
  return Promise.reject(config)
})

http.interceptors.response.use((response) => {
  subLoadingCounter()
  const { code, data, msg, message } = response?.data || {}

  if (data?.code === 401)
    onLogoutLogin()

  if (code === 0 || code === 200 || data?.code === 200 || data?.code === 0)
    return data

  // 库存不足
  // if (code === 440000) {
  //   return data
  // }

  showToast(msg || message || '小程序升级维护中，请您稍后重试，感谢您的理解。')
  return Promise.reject(response)
}, (err) => {
  subLoadingCounter()

  const { statusCode, config = { custom: {} } } = err || {}
  // 401
  if (HTTP_STATUS_CODE.UNAUTHORIZED === statusCode && !config.custom?.isGetToken) {
    config.custom && (config.custom.isGetToken = true)
    return deal401(config).then(res => Promise.resolve(res)).catch(err => Promise.reject(err))
  }
  showToast('小程序升级维护中，请您稍后重试，感谢您的理解。')

  return Promise.reject(err)
})

function showToast(msg: string) {
  return new Promise((resolve) => {
    uni.showToast({
      icon: 'none',
      title: msg,
      complete: resolve,
      duration: 2500,
    })
  })
}

async function deal401(config: any) {
  try {
    // 多个请求等待一个
    !refreshPromise && (refreshPromise = appLogin())
    const res = await refreshPromise
    res && setUserInfo(res)
    return http.request(config)
  }
  catch (error) {
    throw error
  }
  finally {
    clearPromise()
  }
}

export { http }
