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

theme.brandImage = ''
theme.brandTitle = 'gm-mobile'

addons.setConfig({
  theme,
})
