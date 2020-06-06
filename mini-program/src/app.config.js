export default {
  pages: ['pages/index/index'],
  subpackages: [
    {
      root: 'package_a',
      pages: ['pages/index/stories'],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '@gm-mobile',
    navigationBarTextStyle: 'black',
  },
}
