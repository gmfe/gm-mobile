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
  },
  resolve: {
    docDirs: ['docs', ...tailPkgList]
  },
  alias,
  define: { __NAME__: 'mobile' },
  run: {
    globals: ['../../packages/react/src/index.less',
    '../../packages/swiper/src/index.less',
    '../../packages/business/src/index.less',]
  },
  chainWebpack(memo) {
    memo.resolve.alias.set('~@gm-mobile', packagesDir);
    return memo
  }
});
