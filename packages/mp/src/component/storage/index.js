import Taro from '@tarojs/taro'
import _each from 'lodash/each'
import _keys from 'lodash/keys'

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
    _each(StorageKeys, (key) => {
      if (key?.startsWith(this.prefix)) {
        key = key.slice(this.prefix.length)
        result[key] = this.get(key)
      }
    })
    return _keys(result).length ? result : null
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

export default new Storage(PREFIX)
