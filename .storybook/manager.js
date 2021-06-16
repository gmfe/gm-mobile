import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'

let theme = null

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  theme = themes.dark
} else {
  theme = themes.light
}

theme.brandImage =
  'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
theme.brandTitle = 'test'

addons.setConfig({
  theme,
})
