import cookies from 'js-cookie'

const Cookie = {
  get(key) {
    return cookies.get(key)
  },
  set(key, value) {
    return cookies.set(key, value)
  },
  remove(key) {
    cookies.remove(key)
  },
}

export default Cookie
