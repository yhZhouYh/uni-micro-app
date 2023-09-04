const Box = {
  name: '::cache::',
  makeKey(key) {
    return key + Box.name
  },
  isCache(key) {
    return key && key.includes(Box.name)
  },
}
const Storage = {
  /**
   *
   * @param Boolean isCache
   * true 默认值，设置有标记的值
   * false，设置无标记的值
   */
  setStorage(key, data, isCache = true) {
    if (isCache)
      key = Box.makeKey(key)

    return new Promise((resolve, reject) => {
      uni.setStorage({
        key,
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        },
      })
    })
  },

  /**
   *
   * @param String type
   * 'cache' 默认值，获取有标记的值
   * 'normal'，获取无标记的值
   */
  getStorage(key, type = 'cache') {
    return new Promise((resolve, reject) => {
      if (type === 'cache') {
        uni.getStorage({
          key: Box.makeKey(key),
          success(res) {
            resolve(res.data)
          },
          fail(res) {
            reject(res)
          },
        })
      }
      else if (type === 'normal') {
        uni.getStorage({
          key,
          success(res) {
            resolve(res.data)
          },
          fail(res) {
            reject(res)
          },
        })
      }
    })
  },

  /**
   *
   *
   * @param String type
   * 'cache' 默认值，删除有标记的值
   * 'normal'，删除无标记的值
   * 'all'，删除所有值
   */
  removeStorage(key, type = 'cache') {
    if (type === 'cache') {
      uni.removeStorage({ key: Box.makeKey(key) })
    }
    else if (type === 'normal') {
      uni.removeStorage({ key })
    }
    else if (type === 'all') {
      uni.removeStorage({ key: Box.makeKey(key) })
      uni.removeStorage({ key })
    }
  },

  /**
   *
   * @param Boolean clearAll
   * false 默认值，只清除有标记的值
   * true，清除所有
   */
  clearStorage(clearAll = false) {
    if (clearAll) {
      uni.clearStorage()
    }
    else {
      uni.getStorageInfo({
        success(res) {
          const value = res.keys
          for (let i = 0, len = value.length; i < len; i++) {
            const name = value[i]
            if (Box.isCache(name))
              Storage.removeStorage(name, 'normal')
          }
        },
        fail() {

        },
      })
    }
  },
}
wx.Storage = Storage
export default Storage
