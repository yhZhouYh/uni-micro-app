<!--
 * @Author: zxx
 * @Description: uni.getAccountInfoSync方法可以动态获取appid
 * @Date: 2023-08-31 14:14:48
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 10:13:56
 * @FilePath: /template-uni-vue3/src/App.vue
-->
<script setup>
import { useLoginStore } from '~/store/login'

const { info } = useLoginStore()
onLaunch(() => {
  const accountInfo = uni.getAccountInfoSync()
  info.APP_ID = accountInfo.miniProgram.appId
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
</style>
