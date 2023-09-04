<!--
 * @Author: zhangxiangxiang
 * @Description:
 * @Date: 2023-08-31 14:14:48
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 09:41:06
 * @FilePath: /template-uni-vue3/src/pages/index/index.vue
-->
<script setup>
import { getCardThemeList } from '~/api'

const state = reactive({
  title: '首页',
  value: 0,
})
onLoad(() => {
  requestGetCardThemeList()
})
const colors = ['#5261b1', '#52b170', '#97b152', '#42d392', '#ff9966']
const bgColor = ref('')
const bool = ref(false)
function changeColor() {
  const index = Math.floor(Math.random() * 5)
  bgColor.value = colors[index]
  bool.value = !bool.value
}

async function requestGetCardThemeList(page = 1, size = 10) {
  try {
    const data = await getCardThemeList({ page, size })
    console.log(data)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <view>
    <shu-nav-bar :title="state.title" />
    <shu-login-modal />
    <shu-tab-bar :value="state.value" />
  </view>
</template>

<style scoped lang="scss">
.u-fixed{
  color: v-bind(bgColor);
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
