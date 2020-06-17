import Taro from '@tarojs/taro'
import each from 'lodash/each'
import keys from 'lodash/keys'

const PREFIX = '_gm-mobile_'

class Storage {
  constructor(prefix) {
    this.prefix = prefix
  }

  get(key) {
    try {
      return Taro.getStorageSync(this.prefix + key)
    } catch (err) {
      console.warn('Storage get error', err)
    }
  }

  getAll() {
    const result = {}
    let StorageKeys = []
    try {
      StorageKeys = Taro.getStorageInfoSync().keys
    } catch (err) {
      console.warn('Storage getAll error', err)
    }
    each(StorageKeys, (key) => {
      if (key?.startsWith(this.prefix)) {
        key = key.slice(this.prefix.length)
        result[key] = this.get(key)
      }
    })
    return keys(result).length ? result : null
  }

  set(key, value) {
    try {
      Taro.setStorageSync(this.prefix + key, value)
    } catch (err) {
      console.warn('Storage set error', err)
    }
  }

  remove(key) {
    try {
      Taro.removeStorageSync(this.prefix + key)
    } catch (err) {
      console.warn('Storage remove error', err)
    }
  }

  clear() {
    try {
      Taro.clearStorageSync()
    } catch (err) {
      console.warn('Storage clear error', err)
    }
  }
}

const LocalStorage = new Storage(PREFIX)

export default LocalStorage
export { LocalStorage }
