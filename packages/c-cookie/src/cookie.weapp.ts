import cookies from 'weapp-cookie'

const Cookie = {
  domain: '',
  initDomain(domain: string) {
    this.domain = domain
  },
  get(key: string) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    return cookies.get(key, this.domain)
  },
  set(key: string, value: string) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    return cookies.set(key, value, { domain: this.domain })
  },
  remove(key: string) {
    if (!this.domain) {
      throw new Error('need to initDomain')
    }
    cookies.remove(key, this.domain)
  },
}

export default Cookie
