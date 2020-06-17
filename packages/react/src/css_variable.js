import _ from 'lodash'
import { LocalStorage } from './component/storage'

const TYPE = {
  DEFAULT: 'default',
  DARK: 'dark',
  TAO_BAO: 'tao_bao',
  JD: 'jd',
}

const KEY = 'theme'

let computedStyle = null

const CSSVariable = {
  TYPE,
  theme: LocalStorage.get(KEY) || 'default',
  initTheme() {
    document.body.classList.add(`m-theme-${this.theme}`)
  },
  setTheme(theme) {
    if (!_.values(TYPE).includes(theme)) {
      return
    }

    const cl = document.body.classList
    const old = this.theme

    cl.remove(`m-theme-${old}`)
    cl.add(`m-theme-${theme}`)

    this.theme = theme
    LocalStorage.set(KEY, theme)
  },
  // 只获取 body 上面的 css variable
  getValue(name) {
    if (!computedStyle) {
      computedStyle = window.getComputedStyle(document.body)
    }
    // 有空格，要 trim
    return computedStyle.getPropertyValue(name).trim()
  },
}

export default CSSVariable
