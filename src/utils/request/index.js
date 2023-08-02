/* eslint-disable no-useless-catch */
import Request from 'luch-request'
import { HTTP_STATUS_CODE } from './constants'
import { useLoadingStore, useUserStore } from '~/store'

// debugger

const { addLoadingCounter, subLoadingCounter } = useLoadingStore()

const { token, setToken } = useUserStore()

const sleep = function (data, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, ms)
  })
}

function getToken() {
  const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWYTlvdWR0ajU5ZUZzcEtGblo2SVRrWXF5QWs2bHY3dCIsInNvY2lhbF9pZCI6InVid0FwYno4azZOdmQzWmNHNk5ZYjYvUG5INllsZnoxZEUxRlBPalNoRTQ9IiwiY2FyZF9udW1iZXIiOiJLdjRjdUxFcGM2UTd0YWtKSkN3R3pnPT0iLCJvcmlnaW4iOiJ1c2VyIiwic29jaWFsX21hc3Rlcl9pZCI6ImQzRjV2SkZZZkZDMXRTT0M0ZThVd21MNllaZjFuRDBDeEhaaWJKSUk2YzQ9IiwiaXNzIjoiZmFjYWRlLWFwaS5wcC5ka3RhcHAuY2xvdWQiLCJtb2JpbGUiOm51bGwsImV4cCI6MTY5MDk0OTQzNiwiY2xpZW50X25hbWUiOiJNUE1TVE9SRSIsImNsaWVudF9pZCI6IlZhOW91ZHRqNTllRnNwS0ZuWjZJVGtZcXlBazZsdjd0IiwicGVyc29uX2lkIjoiMTUwMDUwODM5NTYifQ.fZdjLzioYH9Sgxly125T8fGjJv6lrCR_XSTjFo4A-kwDViuRghIZmSU06bzgOz7GvS-C-WKg_i43caor6uwBAvklW61oF6Gg5goUzPv4Hs3HqcIObPqyeg9B8NQyRLz_cbRoC2jKGA_-cjeVKBXkwUTMWQWQDWnIJmxoRx6w6SXYvshMB8hTVDzNP7c7jXmTuG69pfZzNCyzZ1qTpCDULvCiQpy56j4QtV1Io78RToQ5L-9kRiUAhOueVtHxiw3nQPK3wIkD30KzZDu-CW44POmHb63sIw8de97l8kpNr8v0KuhDw6hbU-k7fT1ThGhoVmQpj_d_Iw9jgm6FNf8j2g'
  return sleep(token, 1000)
}

let refreshPromise = null // 401 重新获取
const clearPromise = () => refreshPromise = null

const http = new Request()

http.setConfig((config) => {
  config.baseURL = config.custom.baseURL || import.meta.env.VITE_API_BASE
  config.timeout = 60000
  config.header = {
    decathlon_token: token,
    social_id: 'oOwvn5fx49-WJftku8hnNtodHsB8',
  }
  return config
})

http.interceptors.request.use(async (config) => {
  addLoadingCounter()
  // get传参与post一致都是传data
  if (config.method === 'GET')
    config.params = config.data

  // 如果接口不需要token,则添加noAuth
  const { token } = useUserStore()
  config.header.decathlon_token = token

  return config
}, (config) => {
  subLoadingCounter()
  return Promise.reject(config)
})

http.interceptors.response.use((response) => {
  subLoadingCounter()
  return response
}, (err = {}) => {
  subLoadingCounter()
  const { statusCode, config } = err
  // 401
  if (HTTP_STATUS_CODE.UNAUTHORIZED === statusCode && !config.custom.isGetToken) {
    config.custom.isGetToken = true
    deal401(config).then(res => res).catch(err => Promise.reject(err))
    return
  }
  console.log(err)
  return Promise.reject(err)
})

async function deal401(config) {
  try {
    // 多个请求等待一个
    !refreshPromise && (refreshPromise = getToken())
    const token = await refreshPromise
    setToken(token)
    http.request(config)
  }
  catch (error) {
    throw error
  }
  finally {
    clearPromise()
  }
}

export { http }
