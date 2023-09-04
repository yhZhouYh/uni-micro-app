/*
 * @Author: zhangxiangxiang
 * @Description: 登录方法
 * @Date: 2023-08-09 23:17:23
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 16:59:17
 * @FilePath: /template-uni-vue3/src/utils/login/index.ts
 */
import { useLoginStore, useUserStore } from '~/store'
import { getSceneParams } from '~/utils/common/url'
import Storage from '~/utils/common/storage'

import { updateMobile, userCurrent, userLogin } from '~/api/config/login'// 登录接口
import { getMembersCurrent } from '~/api/config/integral'
import pinia from '~/store/setup'

const { info } = useLoginStore(pinia())
const { members } = useUserStore(pinia())
const launchOpts = uni.getLaunchOptionsSync()

/**
 * @description  从小程序码进入需要getSceneParams(e.scene)转
 * @param e
 */
export function onSceneParams(e) {
  const sceneParams = getSceneParams(e.scene)
  const loadopts = {
    t: sceneParams.t ?? e.t,
    id: sceneParams.id ?? e.id,
    type: sceneParams.type ?? e.type,
  }
  loadopts.id && Storage.setStorage('accountId', loadopts.id)
}

/**
 * @description 匿名登录
 * @param e
 * @returns
 */
export function appLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      success: async (res_login) => {
        userLogin({
          app_id: info.APP_ID,
          js_code: res_login.code,
        }).then((res) => {
          resolve(res)
        })
      },
      fail(res) {
        reject()
      },
    })
  })
}

/**
 * @description 设置用户信息
 * @param res_info
 */
export function setUserInfo(res_info) {
  info.auth_token = res_info.auth_token
  info.ticket = res_info.ticket
  info.open_id = res_info.open_id
  info.user_id = res_info.user_id
  info.user_info = res_info.user_info
}

/**
 * @description  获取手机号
 * @param e
 * @param
 * @returns
 */
export async function getPhoneNumber(e) {
  return new Promise(async (resolve, reject) => {
    const login_info = await appLogin()

    try {
      setUserInfo(login_info)

      if (e?.detail?.code || e?.detail?.encryptedData || e?.detail?.encryptData) {
        let account_id = 0
        try {
          account_id = await Storage.getStorage('accountId')
        }
        catch (e) {

        }

        try {
          if (!login_info.ticket) {
            await getUserInfo()
            await getMerbersInfo()
            resolve('success')
          }
          else {
            await updateMobile({
              account_id: 0,
              encrypt_data: e?.detail?.encryptedData || e?.detail?.encryptData,
              iv: e?.detail?.iv,
              app_id: info.APP_ID,
              ticket: info?.ticket || '',
              openId: info.open_id,
            }).then(async (res) => {
              info.auth_token = res.auth_token // 特殊处理刚注册用这个token
              await getUserInfo()
              await getMerbersInfo()
              resolve('success')
            })
          }
        }
        catch (e) {
          reject(e)
        }

        // 注册后调用
        // const sceneParams = getSceneParams(launchOpts.query.scene)
      }
      else {
        uni.showToast({
          title: '手机号获取失败，请尝试更新微信版本后重试',
          icon: 'none',
          duration: 2500,
        })
        return Promise.reject()
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

/**
 * @description  获取用户信息
 * @param r
 * @param t
 * @returns
 */
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    userCurrent().then(
      (res) => {
        info.login = !!res?.user_info?.mobile // 修改登录状态
        resolve()
      },
      (res) => {
        reject(res)
      },
    )
  })
}

/**
 * @description 会员信息服务-获取当前用户
 * @returns
 */
export function getMerbersInfo() {
  return new Promise((resolve, reject) => {
    getMembersCurrent().then(
      (res) => {
        members.current = res
        resolve(res)
      },
      (res) => {
        reject(res)
      },
    )
  })
}

/**
 * @description  退出登录
 */
export function onLogoutLogin() {
  info.login = false
  info.auth_token = ''
  info.user_info = {}
  members.current = {}
}
