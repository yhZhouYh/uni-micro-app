<!--
 * @Author: zxx
 * @Description:
 * @Date: 2023-09-04 09:31:08
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 09:46:29
 * @FilePath: /template-uni-vue3/src/pages/kitchen/index.vue
-->
<script setup>
const state = reactive({
  value: 1,
  title: '灵感厨房',
})
</script>

<template>
  <div>
    <shu-nav-bar :title="state.title" />
    灵感中心

    <shu-tab-bar :value="state.value" />
  </div>
</template>

<style scoped>

</style>
