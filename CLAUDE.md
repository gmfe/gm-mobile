# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`@gm-mobile/*` 的 Lerna monorepo —— 基于 React 16 的移动端 H5 组件库(browserslist 目标:iOS >= 8 / Android >= 5)。所有包采用固定版本模式统一发版(当前 1.1.26),并**以未编译的源码形式发布**(`main: src/index.js`),由使用方的构建管线编译。包本身没有构建步骤。

## 常用命令

```bash
yarn start            # Storybook 开发服务器(主要开发环境)
yarn build            # 构建静态 Storybook 到 docs/
yarn release          # lerna version patch --yes(另有 release:minor、release:major)
yarn publish-beta     # 本地发布 beta 版(需先 npm 登录)
npx lerna bootstrap   # yarn install 后链接跨包依赖
```

- **没有测试** —— 每个包的 `test` 脚本都是直接报错退出,这是有意为之。
- **Lint** 只通过 pre-commit 钩子运行(husky + lint-staged):对 `packages/**/*.js` 执行 `eslint --fix`,对 `*.less` 执行 `stylelint --fix`。ESLint 配置:`.eslintrc.js` → `plugin:gm-react-app/recommended`。
- Storybook 故事与源码同目录:`packages/*/src/**/*.stories.js`,另有 `other/*.stories.js`(配置见 `.storybook/main.js`)。

## 发布流程

推送代码到 `master_v1` 分支,且变更涉及 `packages/**`、`lerna.json` 或 `package.json` 时,GitHub Actions 会自动发布到 npm(`.github/workflows/release.yml`)。标准流程:提交代码 → `yarn release` → `git push origin master_v1`。如果发布失败提示 "cannot publish over previously published versions",说明版本号已存在,重新 bump 后再推一次即可。完整细节见 `RELEASE.md`。另一个 workflow 在 `master` 分支上构建 Storybook 文档并强制推送到 `gm-mobile-docs` 仓库。

## 包架构

依赖方向(无循环):

```
locales ──► react ──► service_time ──► business
               ▲
             swiper(封装 swiper@5)
```

- **`@gm-mobile/locales`** —— i18n 运行时。`getLocale(text)` 在当前语言表中查找 `text`,**找不到时回退为 key 本身**;`setLocale(lng)` 切换语言。语言文件:zh、zh-HK、en、th、ug(`src/*.json`)。
- **`@gm-mobile/react`** —— 核心组件库(`src/component/` 下约 60 个组件)。还导出 `LocalStorage`/`SessionStorage` 工具、`CSSVariable` 主题 API 和全局样式。
- **`@gm-mobile/business`** —— 业务级复合组件(coupon、product_selection、signature、tab_date_select)。
- **`@gm-mobile/service_time`** —— 收货时间选择器逻辑,供 business 使用。
- **`@gm-mobile/swiper`** —— 图片/分类轮播组件。

### 组件目录约定

`packages/react/src/component/<name>/` 下包含:`index.js`(导出)、`<name>.js`(实现,可有其他兄弟文件)、`style.less`、`stories.js`、`README.md`。新增组件还必须:
1. 在 `packages/react/src/index.js` 中导出;
2. 在 `packages/react/src/index.less` 中引入其 `style.less`。

所有样式都是全局的,采用 `m-` 前缀的类名(类 BEM 风格),**没有 CSS Modules**。

### 主题机制

基于 `documentElement` 上的 CSS 自定义属性,通过给根元素加 `m-theme-{default,dark,tao_bao,jd}` 类切换主题。主题 less 文件在 `packages/react/src/theme/`;运行时 API 是 `packages/react/src/css_variable.js` 的 `CSSVariable`(选择持久化到 LocalStorage,`getValue(name)` 读取计算后的 CSS 变量,供 canvas 等 JS 场景使用)。

## i18n 约定(重要)

- **翻译 key 就是中文原文**:`getLocale('确定')`。不要自造抽象 key。
- `getLocale` 只接受一个字符串参数 —— **不支持插值**。动态句子用片段式拼接约定:`` `${getLocale('请输入大于')} ${min} ${getLocale('或等于')}` ``。
- 把中文包进 `getLocale()` 后**不需要立即更新任何 locale 文件**(缺失的 key 会回退显示中文原文,中文环境行为不变)。
- 仓库的 i18n 工作流由 `.claude/skills/` 下三个专用 skill 负责,**优先使用它们而不是临时手改**:
  - **i18n-wrap** —— 把裸中文包裹为 `getLocale()`(两阶段:先出报告,用户确认后才改代码)。
  - **i18n-collect** —— 把已包裹的 key 同步进 `en.json` / `th.json`(只追加,保守并集)。
  - **i18n-fix-tpl** —— 修复混入动态内容的 `getLocale()` 调用和旧 `gm-i18n` 的 `t()` 残留(例如 `packages/react/src/component/counter/index.js` —— **不要模仿该写法**,那里的 `gm-i18n` 是幻影依赖)。

## 代码风格

- ES modules + JSX,babel preset 为 `gm-react-app`;React 16 + `prop-types`(包源码无 TypeScript,但 Storybook 的 webpack 支持 ts/tsx)。
- 可用 lodash(`_`)、big.js、moment;mobx/mobx-react 只出现在 stories 中,不要用于正式组件。
- 浮层类组件(Dialog、Popup、ActionSheet 等)通过 `LayoutRoot` 渲染 —— 新增需要 portal 的 UI 前先看 `packages/react/src/component/layout_root`。
