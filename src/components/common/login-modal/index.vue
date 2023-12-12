<!--
 * @Author: zhangxiangxiang
 * @Description:登录/注册的按钮
 * @Date: 2023-09-01 16:01:22
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 11:32:05
 * @FilePath: /template-uni-vue3/src/components/common/login-modal/index.vue
-->
<script setup>
import { useLoginStore } from '~/store/login'

// const props = defineProps({
//   top: {
//     type: Number,
//     default: 200,
//   },
// })
const { info } = useLoginStore()
const mask = ref(null)

function login() {
  mask.value.show()
}
</script>

<template>
  <view
    v-if="!info.login"
    class="login-modal"
  >
    <text class="login-text">
      加入会员 尊享权益
    </text>
    <view
      class="login-button"
      @click="login()"
    >
      注册/登录
    </view>
    <shu-login-privacy ref="mask" />
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
