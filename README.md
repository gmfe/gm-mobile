
<p align="center">
<h1 align="center">gm-mobile</h1>
<div align="center">观麦移动端&小程序组件库，采用lerna分包管理，👉 <a target="_blank" href="https://gmfe.github.io/gm-mobile-docs/">预览地址</a></div>
</p>

<div align="center">


 [![NPM version][npm-image]][npm-url] ![NPM downloads][download-image]

[npm-image]: https://img.shields.io/npm/v/@gm-mobile/react.svg
[npm-url]: http://npmjs.org/package/@gm-mobile/react


[download-image]: https://img.shields.io/npm/dm/@gm-mobile/react.svg?style=flat-square
[download-url]: https://npmjs.org/package/@gm-mobile/react


</div>


node 14.21.3
## ⌨️ 本地开发

```
# 克隆项目到本地
git clone git@github.com:gmfe/gm-mobile.git

# 进入根目录
cd gm-mobile

# 安装lerna， 已安装跳过
npm i lerna
```

### Web
```
# 安装依赖
yarn

# 各个包的依赖安装
lerna bootstrap

# 项目启动
yarn start

打开浏览器访问 http://localhost:8000 
```

### 小程序
```
# 安装依赖
yarn

# 各个包的依赖安装
lerna bootstrap

# 开发调试
yarn dev:weapp // tip: 真机调试，请运行打包指令，进行压缩

# 打包
yarn build:weapp
```
### 添加图标
```
# 将图片放入 packages/c-font/svg

# 运行指令
yarn svg
```

## 包命名

```
c-xxx: 跨端，小程序和web适用

mp-xxx: 小程序

react: 常规(web)
```
### 组件目录
```
# 拿c-react的components目录举例
components
├── action_sheet 组件
│   ├── action_sheet.tsx // 组件源代码
│   └── index.ts // 导出web使用
│   └── index.weapp.ts // 导出小程序使用
│   └── stories.tsx // 使用组件的示例代码
│   └── style.less // 组件样式
│   └── types.ts // 组件接口
```
## ✨ 一些主要的packages

### @gm-mobile/c-business 

存放小程序和web公共业务相关组件

### @gm-mobile/locales

处理多语言的

### @gm-mobile/c-react

小程序和web公共基础组件

### @gm-mobile/mp-business

小程序独有的业务组件

### @gm-mobile/mp

小程序独有的组件

### @gm-mobile/mp-request

适用小程序的请求中间件

### @gm-mobile/react

web独有的组件

## 测试与发布


 一般会在开发分支上发布测试版本，后续需求全量再合到 `master` 发布正式版本

#### 发布步骤

   注意需要在  npm 下，可以通过 whoami  命令查看

   npm login  登陆账号发布，否则发不成功

   账号/密码/邮箱：xxx/xxx/xxx

   组件库是lerna 管理的，直接跑命令：

  ```
     # 发测试版，过程中会让选版本或者可以自定义
     yarn publish-beta 

     # 发正式版
     yarn publish-latest 
    
     # 更新线上预览文档
     yarn chromatic  
  ```

### 2026 发布

npm run version 更改version 后会触发github 流水线自动发布



## 其他问题

 * 为处理小程序 div，span 标签问题，封装提供 View，Text 标签。所有涉及小程序相关一律采用 View， Text

 * 为处理小程序 svg 展示问题，提供 svg2font 转换。新增svg 时跑 `yarn run svg` 命名重新生成类名，小程序接入时直接 `<View className='xxx' />` 即可

 * web 与 小程序皆提供 storybook，直接跑命令即可。




