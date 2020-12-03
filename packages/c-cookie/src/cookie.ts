import cookies from 'js-cookie'

const Cookie = {
  get(key: string) {
    return cookies.get(key)
  },
  set(key: string, value: string | object) {
    return cookies.set(key, value)
  },
  remove(key: string) {
    cookies.remove(key)
  },
}

export default Cookie
