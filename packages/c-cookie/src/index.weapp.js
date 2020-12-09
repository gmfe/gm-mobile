import cookies from 'weapp-cookie'

const Cookie = {
  domain: '',
  initDomain(domain) {
    this.domain = domain
  },
  get(key) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    return cookies.get(key, this.domain)
  },
  set(key, value) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    return cookies.set(key, value, { domain: this.domain })
  },
  remove(key) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    cookies.remove(key, this.domain)
  },
}

export default Cookie
