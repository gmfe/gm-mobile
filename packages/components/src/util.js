function isWeApp() {
  return process.env.TARO_ENV === 'weapp'
}

// 不是 taro 就是 web
function isWeb() {
  return process.env.TARO_ENV === 'undefined'
}

export { isWeApp, isWeb }
