/*
 * @Author: zxx
 * @Description: 
 * @Date: 2023-08-31 14:14:48
 * @LastEditors: zxx
 * @LastEditTime: 2023-09-04 21:16:34
 * @FilePath: /template-uni-vue3/src/env.d.ts
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'uview-plus' {
  import type {Plugin} from 'vue'
  const plugin: Plugin
  export default plugin
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

