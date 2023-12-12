const antfu = require('@antfu/eslint-config').default

module.exports = antfu({

  rules: {
    'no-console': 'off',
  },

  unocss: true,
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  // typescript: true,
  // vue: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '/dist/*',
  ],
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
