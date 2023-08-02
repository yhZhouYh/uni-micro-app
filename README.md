# vue3 + pinia + unocss + uviewplus

## pinia
pinia配置persist,会使用持久化保存（uniStorage）
```ts
import { defineStore } from 'pinia'

function store() {
  const username = ref('')
  const token = ref('')
  function setToken(value: string) {
    token.value = value
  }
  return {
    username,
    token,
    setToken,
  }
}

export const useUserStore = defineStore('user', store, {
  persist: {
    enabled: true,
  },
})
```

## unocss
[类名查询](https://unocss.dev/interactive/?s=background)
默认使用[mdi](https://icones.js.org/collection/mdi)图表
![Alt text](image.png)

## uviewplus
暂时使用这个框架https://uiadmin.net/uview-plus/components/icon.html

## autoimport
vue相关方法和decloud相关方法都自动按需引入了，不需要import, easycom配置了uviewplus组件，也可直接使用

## todos
持续添加公共功能...

