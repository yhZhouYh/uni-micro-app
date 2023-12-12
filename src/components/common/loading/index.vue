<!--
 * @Author: zhangxiangxiang
 * @Description: loading
 * @Date: 2023-08-16 15:31:42
 * @LastEditors: zhangxiangxiang
 * @LastEditTime: 2023-08-31 14:40:19
 * @FilePath: /template-uni-vue3/src/components/common/loading/index.vue
-->
<script></script>

<script setup  name="Loading">
import { useLoadingStore } from '~/store'

const loadingStore = useLoadingStore()
</script>

<template>
  <u-popup
    :show="loadingStore.loading"
    :overlay="false"
    mode="center"
    :custom-style="{ background: 'transparent' }"
    z-index="1"
  >
    <view class="loading">
      <view>
        <view class="c1" />
        <view class="c2" />
        <view class="c3" />
        <view class="c4" />
      </view>
      <!-- <span>loading</span> -->
    </view>
  </u-popup>
</template>

<style lang="scss" scoped>
  .loading {
  // width: 100%;
  // height: 100%;
  // background: #16171d;
  // opacity: 0.9;
  // position: fixed;
}

.loading > view {
  width: 60px;
  height: 60px;
  position: absolute;
  left: 50%;
  margin-left: -30px;
  top: 50%;
  margin-top: -30px;
}

.loading > view > view {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  background: #ffb81c;
  top: 10px;
  left: 10px;
  transform-origin: 20px 20px;
  border-radius: 8px;
  animation: spin-a 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

.loading > view > .c2 {
  top: 10px;
  left: auto;
  right: 10px;
  transform-origin: -4px 20px;
  animation: spin-b 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > view > .c3 {
  top: auto;
  left: auto;
  right: 10px;
  bottom: 10px;
  transform-origin: -4px -4px;
  animation: spin-c 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}
.loading > view > .c4 {
  top: auto;
  bottom: 10px;
  transform-origin: 20px -4px;
  animation: spin-d 2s infinite cubic-bezier(0.5, 0, 0.5, 1);
}

@keyframes spin-a {
  0% {
    transform: rotate(90deg);
  }
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-b {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-c {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spin-d {
  0% {
    transform: rotate(90deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading > span {
  width: 100px;
  height: 30px;
  position: absolute;
  left: 50%;
  margin-left: -50px;
  top: 50%;
  margin-top: 30px;
  color: #ff8c00;
  font-size: 12px;
  text-align: center;
}
</style>
