<script  setup>
import router from '~/router'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

onMounted(() => { })

function change(value) {
  const tabBarRouter = [
    '/pages/index/index',
    '/pages/kitchen/index',

  ]

  router.pushTab(tabBarRouter[value])
}
</script>

<template>
  <u-tabbar
    :value="props.value"
    :fixed="true"
    :placeholder="true"
    active-color="#000"
    inactive-color="#CBCCCD"
    :safe-area-inset-bottom="true"
    z-index="999"
    custom-class="pb-safe"
    @change="change"
  >
    <u-tabbar-item text="首页">
      <template #active-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
      <template #inactive-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
    </u-tabbar-item>
    <u-tabbar-item text="灵感厨房">
      <template #active-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
      <template #inactive-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
    </u-tabbar-item>
    <u-tabbar-item text="新品共创营">
      <template #active-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
      <template #inactive-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
    </u-tabbar-item>
    <u-tabbar-item text="积分中心">
      <template #active-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
      <template #inactive-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
    </u-tabbar-item>
    <u-tabbar-item text="我的">
      <template #active-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
      <template #inactive-icon>
        <image
          :style="{ width: '48rpx', height: '56rpx' }"
          src=""
        />
      </template>
    </u-tabbar-item>
  </u-tabbar>
</template>

<style lang="scss" scoped>

</style>
