<script setup lang="ts">
import { getCardThemeList } from '~/api'

onLoad(() => {
  console.log(uni)
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
  <u-navbar
    title="个人中心"
    :auto-back="true"
  />

  <view class="text-area mt-100rpx text-xl active:(bg-gray-400 font-medium)">
    <text class="title u-fixed m-10" />
  </view>
  <u-button type="primary" @click="changeColor">
    点我变颜色
  </u-button>
  <view i-mdi-alarm text-sm class="u-fixed" />
  <text class="u-fixed">
    {{ bgColor }}
  </text>
</template>

<style scoped>
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

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
