function weApp() {
  return process.env.TARO_ENV === 'weapp'
}

// 不是 taro 就是 web
function web() {
  return process.env.TARO_ENV === 'undefined'
}

const promise = (arg) => toString.call(arg) === '[object Promise]'

const is = {
  web,
  weApp,
  promise,
}

export default is
