function weApp() {
  return process.env.TARO_ENV === 'weapp'
}

// 不是 taro 就是 web
function web() {
  return process.env.TARO_ENV === 'undefined'
}

const promise = (arg) => toString.call(arg) === '[object Promise]'

const chinese = (value) => {
  return /[\u4E00-\u9FA5]/.test(value)
}

const is = {
  web,
  weApp,
  promise,
  chinese,
}

export default is
