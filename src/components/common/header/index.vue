<script setup lang="ts">
// import UImage from 'uview-plus/components/u-image/u-image.vue'

defineProps({
  name: String,
})
const emit = defineEmits(['update:name'])
const a = ref('1')

// const valueRef = useVModel(props, 'name', emit)
function getChange() {
  emit('update:name', Math.random().toString())
}
</script>

<template>
  <div>
    我是头部
    {{ a }}
    {{ name }}
    <u-image
      src="https://cdn.uviewui.com/uview/album/1.jpg"
      mode="widthFix"
    />
    <u-button type="primary">
      test
    </u-button>

    <button @tap="getChange">
      点我
    </button>
  </div>
</template>

<style lang="scss" scoped>

</style>
