/*
 * @Author: zxx
 * @Description: 上传图片的方法
 * @Date: 2023-09-04 09:52:33
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 11:39:40
 * @FilePath: /template-uni-vue3/src/utils/common/upload.js
 */
import { useLoginStore } from '~/store/login'

const uploadPath = '/mini/api/common/upload'

export function uploadImg(filePath) {
  const { info } = useLoginStore()
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: BASE_URL + uploadPath, // 开发者服务器的URL。
      filePath,
      name: 'file', // 必须填file。
      header: {
        authorization: `${info.auth_token}`,
        openId: info.open_id,
      },

      formData: {},
      success(res) {
        if (typeof res.data === 'string')
          res = JSON.parse(res.data)

        if (res.code === 200)
          resolve(res.data || {})
        else
          reject()
      },
      fail: reject,

    })
  })
}
