export default {
  pages: ['pages/index/index', 'pages/mp/index'],
  subpackages: [
    {
      root: 'pages_a',
      pages: ['stories/index'],
    },
    {
      root: 'pages_b',
      pages: ['page/index'],
    },
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/mp/index',
        text: '小程序',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '@gm-mobile',
    navigationBarTextStyle: 'black',
  },
}
