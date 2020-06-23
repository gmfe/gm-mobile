export default {
  pages: ['pages/index/index', 'pages/mp/index'],
  subpackages: [
    {
      root: 'pages_a',
      pages: ['stories/index'],
    },
    {
      root: 'pages_b',
      pages: ['page/index', 'tabbar/index'],
    },
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'img/icon_component.png',
        selectedIconPath: 'img/icon_component_HL.png',
      },
      {
        pagePath: 'pages/mp/index',
        text: '小程序',
        iconPath: 'img/icon_component.png',
        selectedIconPath: 'img/icon_component_HL.png',
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
