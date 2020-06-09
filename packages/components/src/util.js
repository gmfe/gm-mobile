function isWeApp() {
  return process.env.TARO_ENV === 'weapp'
}

// 不是 taro 就是 web
function isWeb() {
  return process.env.TARO_ENV === 'undefined'
}

const isPromise = (arg) => toString.call(arg) === '[object Promise]'

export { isWeApp, isWeb, isPromise }
