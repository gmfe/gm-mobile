import Taro, {
  navigateBack,
  navigateTo,
  switchTab,
  reLaunch,
  redirectTo,
} from '@tarojs/taro'
// import { Events } from '@gm-mobile/c-tool'
import { omit } from 'lodash'
import Events from './events/event.weapp'

/** 仅在开发环境下用到，路由变化时记录下来，每次修改代码页面刷新后，回到上次页面 */
const PAGE_URL_LAST_TIME = '__dev_env_page_url_last_time'
interface RouteExtraOption {
  /** 通过路由传参，options键值会被拼合到url中传给新页面 */
  options?: { [key: string]: string }
}

interface RouteEvent {
  openType: string
  path: string
  query: {
    [key: string]: string
  }
  webviewId: number
}

export default class Router {
  constructor(option?: {
    /** 路由变化前调用，返回false停止路由跳转 */
    auth: (from: string, to: string) => boolean
    /** 开发模式，会在代码变化界面刷新后，自动恢复刷新前的页面 */
    dev?: boolean
  }) {
    this._auth = option?.auth
    // @ts-ignore
    wx.onAppRoute((route: RouteEvent) => {
      Events.dispatch('route_change', route)
    })
    Events.add('route_change', this.onRouteChange)

    if (option?.dev) {
      setTimeout(() => {
        this.restorePage()
      }, 1000)
    }
  }

  /** 转场记录 */
  private _transition: {
    [key: string]: {
      from?: string
      resolve?: (value?: any) => void
    }
  } = {}

  /** navigateTo传入的{data:值} */
  private _data?: any

  /** 最近一次的路由跳转动作是 */
  currentAction?:
    | 'navigateTo'
    | 'switchTab'
    | 'navigateBack'
    | 'redirectTo'
    | 'reLaunch'

  /** 当前路由信息 */
  get route() {
    const page = getCurrentPages().reverse()[0]
    return {
      /** 页面config而配置的标题 */
      title: page.config.navigationBarTitleText as string,
      /** 页面路径 */
      path: '/' + page.route,
      /** url参数 */
      options: page.options,
      /** navigateTo传入的{data:值} */
      data: this._data,
    }
  }

  private _auth?: (from: string, to: string) => boolean

  /** 监听路由变化,注意小程序默认导航栏的左上方按钮返回的事件监听不到，进入不了下面的回调 */
  onRouteChange({ detail: route }: { detail: RouteEvent }) {}

  private _beforeChange(
    /** 各种路由跳转方法传入的option */
    option: any,
    next: () => Promise<Taro.General.CallbackResult>
  ) {
    wx.setStorageSync(PAGE_URL_LAST_TIME, option)
    const parsed = this._parse(option)

    const to =
      parsed?.url || this._transition[this.route.path]?.from || this.route.path
    if (this._auth) {
      if (this._auth(this.route.path, to)) {
        return next()
      } else {
        return false
      }
    } else {
      return next()
    }
  }

  /** 跳转到指定路径，返回值为跳转后页面中调用navigateBack的传的data */
  navigateTo<T>(
    option: string | (RouteExtraOption & navigateTo.Option & { data?: any })
  ): Promise<T> {
    this.currentAction = 'navigateTo'
    const parsed = this._parse<navigateTo.Option>(option)
    return new Promise((resolve, reject) => {
      const from = this.route.path
      const to = this._urlToPath(parsed.url)
      this._transition[to] = {
        from: from,
        resolve,
      }
      if (typeof option === 'object') {
        const data = typeof option === 'object' ? option.data : undefined
        // @ts-ignore
        data && delete parsed.data
        this._data = data
      }
      this._beforeChange(option, () => Taro.navigateTo(parsed))
    })
  }

  navigateBack(
    option?: RouteExtraOption & navigateBack.Option & { data?: any }
  ) {
    this.currentAction = 'navigateBack'
    const from = this.route.path
    if (this._transition[from]) {
      // 页面跳转完成后resolve
      const onChange = () => {
        const solve = this._transition[from].resolve
        if (solve) {
          solve(option?.data)
          delete this._transition[from].resolve
        }
        Events.remove('route_change', onChange)
      }
      Events.add('route_change', onChange)
    }

    return this._beforeChange(option, () => Taro.navigateBack(option))
  }

  switchTab(option: string | (RouteExtraOption & switchTab.Option)) {
    this.currentAction = 'switchTab'
    const parsed = this._parse<switchTab.Option>(option)
    return this._beforeChange(option, () => Taro.switchTab(parsed))
  }

  redirectTo(option: string | (RouteExtraOption & redirectTo.Option)) {
    this.currentAction = 'redirectTo'
    const parsed = this._parse<redirectTo.Option>(option)
    return this._beforeChange(option, () => Taro.redirectTo(parsed))
  }

  reLaunch(option: string | (RouteExtraOption & reLaunch.Option)) {
    this.currentAction = 'reLaunch'
    const parsed = this._parse<reLaunch.Option>(option)
    Taro.reLaunch(parsed)
  }

  /** 开发环境下，回到上次页面 */
  restorePage() {
    if (wx.getAccountInfoSync().miniProgram.envVersion === 'develop') {
      const option = wx.getStorageSync(PAGE_URL_LAST_TIME)
      if (option) {
        this.navigateTo({
          ...option,
          fail: (err: any) => {
            if (err.errMsg.indexOf('tabbar page') !== -1) {
              this.switchTab(option)
            }
          },
        })
      }
    }
  }

  private _parse<T>(option: string | (RouteExtraOption & T)): T {
    const newOption = { url: '' }
    switch (typeof option) {
      case 'undefined':
        break
      case 'string':
        newOption.url = option
        break
      case 'object': {
        const [path, paramStr = ''] = ((option as any).url || '').split('?')
        const options: any = paramStr.split('&').reduce(
          (pre: string, cur: string, i: number) => {
            const arr = cur.split('=')
            return Object.assign(pre, {
              [arr[0]]: encodeURI(arr[1]),
            })
          },
          { ...option.options }
        )
        const optionsKeys = Object.keys(options).filter((v) => v)
        const newOptions = optionsKeys.reduce((pre, key, i) => {
          if (pre === '') pre = '?'
          return (
            pre +
            key +
            '=' +
            decodeURI(options[key]) +
            (~-optionsKeys.length === i ? '' : '&')
          )
        }, '')
        const url = path + newOptions
        Object.assign(newOption, omit(option, ['options']), { url })
        break
      }
      default:
        break
    }
    return newOption as any
  }

  /**
   * convert '/pages/index?hello=1' to '/pages/index'
   */
  private _urlToPath(path: string) {
    return path.replace(/\?.*/, '')
  }
}
