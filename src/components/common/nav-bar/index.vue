<!--
 * @Author: zxx
 * @Description: 自定义navbar
 * @Date: 2023-09-04 09:21:00
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 20:48:10
 * @FilePath: /template-uni-vue3/src/components/common/nav-bar/index.vue
-->
<script setup>
import router from '~/router'

const props = defineProps({
  title: {
    type: String,
    default: '首页',
  },
  leftIconSize: {
    type: Number,
    default: 40,
  },
  url: {
    type: String,
    default: '',
  },
  autoBack: {
    type: Boolean,
    default: true,
  },

})

function leftClick() {
  console.log('uuuu')
  if (!props.autoBack)
    return
  // 我的 -> 积分中心 -> 返回我的页面
  if (props?.url) {
    router.pushTab({
      path: props.url,
    })
  }
}
</script>

<template>
  <view>
    <u-navbar
      :title="title"
      :auto-back="props.autoBack"
      :left-icon-size="`${props.leftIconSize}rpx`"
      :placeholder="true"
      :border="true"
      safe-area-inset-top="true"
      :title-style="{
        color: '#000',
        fontWeight: 500,
        fontSize: '36rpx',
      }"
      @left-click="leftClick()"
    />
  </view>
</template>

<style lang="scss" scoped>

</style>
