import { noop } from 'lodash'
import React, { FC, useEffect } from 'react'
import router from './router_mp'

export const Normal = () => {
  return (
    <div>
      <div>
        此工具增强了小程序的路由操作功能, Show code to see more details:
      </div>
    </div>
  )
}

Normal.parameters = {
  docs: {
    source: {
      code: `
import Router from '@gm-mobile/c-tool'
const router = new Router({
/** 开发模式，会在代码变化界面刷新后，自动恢复刷新前的页面 */
dev: true,
/** 路由变化前调用，返回false停止路由跳转 */
auth(from, to) {
  if (!globalStore) {
    return true
  }
  const isLogin = globalStore.isLogin
  // 未登录且不在免登录白名单内
  if (
    !isLogin &&
    !['/pages/user'].find(
      (path) => to.startsWith(path) || from.startsWith(path)
    )
  ) {
    router.navigateTo('/pages/user/login')
    return false
  } else {
    return true
  }
},
})
        `,
      type: 'code',
    },
  },
}

export const options = () => {
  return <div>可以直接传字符串path或者对象</div>
}
options.parameters = {
  docs: {
    source: {
      code: `
router.navigateTo('/pages/index/index')
router.navigateTo({url:'/pages/index/index'})
router.navigateTo('/pages/index/index?a=1&b=2')
router.navigateTo({url:'/pages/index/index',options:{a:1,b:2}})
          `,
      type: 'code',
    },
  },
}

export const data = () => {
  return <div>可以传自定义data</div>
}
data.parameters = {
  docs: {
    source: {
      code: `
router.navigateTo({url:'/pages/user/edit',data: <img />})
            `,
      type: 'code',
    },
  },
}

export const route = () => {
  return <div>新页面中获取传入的参数</div>
}
route.parameters = {
  docs: {
    source: {
      code: `
router.route.options // {a:1,b:2}
router.route.data // <img/>
              `,
      type: 'code',
    },
  },
}

export const cowork = () => {
  return <div>navigateTo和navigateBack配合使用</div>
}
cowork.parameters = {
  docs: {
    source: {
      code: `
// page A
const value = await router.navigateTo('/user/getValue')
console.log(value) // 'hello'

// page B
router.navigateBack('hello')
              `,
      type: 'code',
    },
  },
}

export const other = () => {
  return (
    <div>
      所有的方法都是继承了Taro的路由方法，更多使用方式:
      <a href='https://taro-docs.jd.com/taro/docs/apis/route/switchTab/'>
        https://taro-docs.jd.com/taro/docs/apis/route/switchTab/
      </a>
    </div>
  )
}
other.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
}

export default {
  title: '工具/Router_MP',
}
