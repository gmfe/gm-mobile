import _ from 'lodash'

const defaultTheme = {
  // 尽量不要用这里的变量，而是用下面抽象的颜色
  '--color-first': '#000', // black 主内容
  '--color-second': '#798294', // semi 次要主内容
  '--color-third': '#888', // grey 次要内容
  '--color-fourth': '#b2b2b2', // light 缺省

  // 颜色
  '--color-primary': '#1eac52',
  '--color-success': '#09bb07',
  '--color-danger': '#e64340',
  '--color-link': '#576b95',
  '--color-desc': '#888',
  '--color-red': 'red',
  '--color-white': 'white',
  '--color-black': 'black',
  '--color-placeholder': '#b2b2b2',

  // active
  '--color-primary-active': '#1a9648', // darken(#1eac52, 5%)
  '--color-danger-active': '#d71f1c', // darken(#e64340, 10%)
  '--color-white-active': '#ededed',

  // 背景色
  '--color-bg-white': 'white',
  '--color-bg-back': '#f5f6f7', // 背景色
  '--color-bg-primary': '#1eac52',
  '--color-bg-disabled': '#f5f5f5',

  // mask 背景色
  '--color-bg-mask': 'rgba(0, 0, 0, 0.6)',
  '--color-bg-mask-white': 'rgba(255, 255, 255, 0.8)',

  // border
  '--color-border': '#d4d8d8',

  // btn
  '--btn-bg-default': '#f4f5f6',
  '--btn-bg-default-active': '#cacccd', // darken(#e4e5e6, 10%)
  '--btn-color-default': '#7a7a7a',
}

const map = {
  default: defaultTheme,
}

const CSSVariable = {
  theme: 'default',
  init() {
    _.each(map[this.theme], (v, k) => {
      window.document.documentElement.style.setProperty(k, v)
    })
  },
  get(key) {
    const t = map[this.theme]

    if (t[key]) {
      console.warn('can not find key')
    }

    return defaultTheme[key] || ''
  },
  getAll() {
    return map[this.theme]
  },
}

export default CSSVariable
