export default {
  pages: ['pages/index/index', 'pages/other/index'],
  subpackages: [
    {
      root: 'pages_a',
      pages: ['stories/index'],
    },
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/other/index',
        text: '其他',
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
