/*
 * @Author: zxx
 * @Description:
 * @Date: 2023-08-31 14:14:48
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 21:15:54
 * @FilePath: /template-uni-vue3/.eslintrc.js
 */
module.exports = {
  extends: ['@antfu', '@unocss'],
  rules: {
    'no-console': 'off',
  
  },
  globals: {
    uni: true,
    UNI_ROUTES: true,
    wx: true,
    BASE_URL: true,

  },
}
