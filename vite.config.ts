import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Inspect from 'vite-plugin-inspect'
import VueInject from '@shu-fe/unplugin-vue-inject/vite'
import PagesConfig from './src/pages.json'

const pagesFiles = PagesConfig.pages.map(page => path.resolve('src', `${page.path}.vue`))

export default defineConfig({
  plugins: [
    // 为所有pages的页面添加loading组件,自定义组件需要是全局组件
    VueInject({
      files: pagesFiles,
      template: '<shu-loading />',
    }),
    Unocss(),
    // 自动引入vue和uni-app相关方法
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      imports: [
        'vue',
        'uni-app',
      ],
    }),
    uni(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})