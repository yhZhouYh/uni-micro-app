/*
 * @Author: zhangxiangxiang
 * @Description:url转码
 * @Date: 2023-09-01 17:38:35
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 17:38:53
 * @FilePath: /template-uni-vue3/src/utils/common/url.js
 */

class UrlUtil {
  // url参数编码
  urlParamsEncode(params) {
    return encodeURIComponent(params)
  }

  // url参数解码
  urlParamsDecode(params) {
    if (typeof params === 'string')
      return decodeURIComponent(params)

    if (typeof params === 'object' && !Array.isArray(params)) {
      if ('scene' in params) {
        const sceneValue = params.scene
        if ((`${sceneValue}`).includes('=')) {
          const re = /(\w+)=?([^=&]+)?&?/g
          sceneValue.replace(re, (x1, x2, x3) => {
            params[x2] = decodeURIComponent(x3)
          })
        }
      }
      else {
        for (const i in params)
          params[i] = decodeURIComponent(params[i])
      }
      return params
    }
    return ''
  }

  // url编码序列化
  urlStringify(url, params = {}) {
    const str = Object.keys(params)
      .map(key => `${key}=${this.urlParamsEncode(params[key])}`)
      .join('&')

    if (str) {
      if (url.includes('?'))
        return `${url}&${str}`
      else
        return `${url}?${str}`
    }
    else {
      return url
    }
  }

  // 截取完整字符串中的子地址
  getSubUrl(url) {
    url = url.match(/https?:\/\/.*?(\/[^]+)/i)
    let domain = ''
    if (url && url[1])
      domain = url[1]

    return domain
  }
}

export default new UrlUtil()
/**
 * 将scene中的数据转换为obj对象
 * @param {string} queryString option.scene的值 例如 tid
 * @returns
 */
export function getSceneParams(queryString = '') {
  const params = {}

  if (typeof queryString === 'string') {
    queryString = decodeURIComponent(queryString)
    const pairs = queryString.split('&')
    pairs.forEach((pair) => {
      const [key, value] = pair.split('=')
      params[key] = value ?? ''
    })
  }

  return params
}
