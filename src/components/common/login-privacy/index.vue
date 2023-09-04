<!--
 * @Author: zhangxiangxiang
 * @Description: 登录弹窗
 * @Date: 2023-08-09 17:32:44
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-09-01 17:12:18
-->
<script setup>
import { storeToRefs } from 'pinia'
import { getPhoneNumber } from '~/utils/login'
import { useLoginStore } from '~/store/login'
import router from '~/router'

const emit = defineEmits('loginSuccess')
const store = useLoginStore()
const { login } = storeToRefs(store)

const state = reactive({
  checked: [],
  isShow: false,
  login,
  disabled: true,
})

function onCheckBox() {
  state.checked = !state.checked
}

async function getPhone(e) {
  if (!state.checked.length)
    return false

  const res = await getPhoneNumber(e)
  if (res === 'success')
    show()
  emit('loginSuccess')
}

function show() {
  state.isShow = !state.isShow

  if (!state.isShow)
    state.checked = false
}

function onPrivacyView() {
  router.push({
    path: '/pages/user/user-privacy/index',
  })
}
function onPrivacyView2() {
  router.push({
    path: '/pages/user/clauses/index',
  })
}

defineExpose({ show })
</script>

<template>
  <view
    v-if="state.isShow"
    class="mask"
  >
    <view class="mask-modal">
      <view class="mask-nav">
        <view class="mask-title">
          隐私政策
        </view>
        <view
          class="close-style"
          @click="show()"
        >
          <image
            class="mask-close"
          />
        </view>
      </view>
      <text class="mask-text">
        您需阅读并同意最新的条款，才能继续使用小程序的服务。
      </text>
      <view class="mask-private">
        <u-checkbox-group
          v-model="state.checked"
          @change="onCheckBox"
        >
          <u-checkbox
            :custom-style="{ marginBottom: '8px' }"
            :name="true"
            label-size="28rpx"
            label-color="#656565"
          />
        </u-checkbox-group>
        <view class="mask-items">
          <text class="mask-check">
            我同意并接受卡夫亨氏小程序的
          </text>
          <text
            class="mask-content"
            @click="onPrivacyView()"
          >
            隐私政策
          </text>
          <text>和</text>
          <text
            class="mask-content"
            @click="onPrivacyView2()"
          >
            用户协议
          </text>
        </view>
      </view>
      <u-button
        v-if="!state.checked.length"
        type="primary"
        :custom-style="{
          borderRadius: '56rpx',
          width: '686rpx',
          marginTop: '126rpx',
          backgroundColor: '#A6192E',
          border: 'none',
          height: '96rpx',
          fontSize: '32rpx',
          fontWeight: 600,

          opacity: !state.checked.length ? '.6' : '1',
        }"
      >
        授权手机号
      </u-button>
      <u-button
        v-if="!!state.checked.length"
        type="primary"
        open-type="getPhoneNumber"
        :custom-style="{
          borderRadius: '56rpx',
          width: '686rpx',
          marginTop: '126rpx',
          backgroundColor: '#A6192E',
          border: 'none',
          height: '96rpx',
          fontSize: '32rpx',
          fontWeight: 600,
          opacity: !state.checked.length ? '.6' : '1',
        }"
        @getphonenumber="getPhone"
      >
        授权手机号
      </u-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
