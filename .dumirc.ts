import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';


const headPkgList: string[] = [];
// utils must build before core
// runtime must build before renderer-react
const packagesDir = join(__dirname, 'packages')
const pkgList = readdirSync(packagesDir).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@gm-mobile/${pkg}`] = join(packagesDir, pkg, 'src');
  return {
    ...pre,
  };
}, {});
console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);
const tailPkgList = pkgList.map((path) => `packages/${path}/src`);

export default defineConfig({
  outputPath: 'docs-dist',
  base: '/gm-mobile/',
  publicPath: '/gm-mobile/',
  themeConfig: {
    name: 'gm-mobile',
    carrier: '中国移动', // 设备状态栏左侧的文本内容
    hd: {
      // 根据不同的设备屏幕宽度断点切换高清方案
      rules: [
        // { maxWidth: 375, mode: 'vw', options: [100, 750] },
        // { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
      ],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/1.x/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  },
  resolve: {
    docDirs: ['docs', ...tailPkgList],
    entryFile: 'packages/c-react/src/index.ts',
  },
  alias,
  define: { __NAME__: 'mobile' },
  apiParser: {},
  chainWebpack(memo) {
    memo.resolve.alias.set('~@gm-mobile', packagesDir);
    return memo
  }
});
