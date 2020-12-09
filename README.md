# 包命名

c-xxx: 跨端
mp-xxx: 小程序
xxx: 常规（web)

# 其它
为处理小程序 div，span 标签问题，封装提供 View，Text 标签。所有涉及小程序相关一律采用 View， Text

为处理小程序 svg 展示问题，提供 svg2font 转换。新增 svg 时跑 `yarn run svg` 命名重新生成类名，
接入时直接 <View className='xxx' /> 即可

web 与 小程序皆提供 storybook，直接跑命令即可。
