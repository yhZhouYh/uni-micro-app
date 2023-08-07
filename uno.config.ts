import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import presetIcons from '@unocss/preset-icons'
import transformerVariantGroup from '@unocss/transformer-variant-group'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default {
  presets: [
    presetWeapp(),
    presetWeappAttributify(),
    presetIcons(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      'center': 'flex justify-center items-center',
      'wh-full': 'wh-full',
    },
  ],

  transformers: [
    transformerVariantGroup(),
    transformerAttributify(),
    transformerClass(),
  ],
}
