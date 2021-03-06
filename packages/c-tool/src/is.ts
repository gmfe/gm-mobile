function weApp() {
  return process.env.TARO_ENV === 'weapp'
}

// 不是 taro 就是 web
function web() {
  return process.env.TARO_ENV === 'undefined'
}

const promise = (arg: any) => toString.call(arg) === '[object Promise]'

const chinese = (value: string): boolean => {
  return /[\u4E00-\u9FA5]/.test(value)
}

let isiOS: boolean | null = null
const iOS = () => {
  if (isiOS === null) {
    isiOS = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
  return isiOS
}

const weixin = () => /MicroMessenger/i.test(navigator.userAgent)

const phone = () => window.navigator.userAgent.includes('Mobile')

const is = {
  web,
  weApp,
  promise,
  chinese,
  iOS,
  weixin,
  phone,
}

export default is
