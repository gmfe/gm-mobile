import _each from 'lodash/each'
import is from '../is'

const isWeApp = is.weApp()

class StorageFactory {
  constructor(prefix, target) {
    this.prefix = prefix
    this.target = target
  }

  set(key, value) {
    try {
      if (isWeApp) {
        wx.setStorageSync(`${this.prefix}${key}`, value)
      } else {
        this.target.setItem(`${this.prefix}${key}`, JSON.stringify(value))
      }
    } catch (err) {
      console.warn('Storage set error', err)
    }
  }

  get(key) {
    try {
      let value

      if (isWeApp) {
        value = wx.getStorageSync(this.prefix + key)
      } else {
        value = this.target.getItem(this.prefix + key)
        if (value) {
          value = JSON.parse(value)
        }
      }

      return value
    } catch (err) {
      console.warn('Storage set error', err)
      // 如果 parse 错误，代表这个存储错误，认为就是没有这个存储，保持和没存储的表现一直，返回 null
      return null
    }
  }

  remove(key) {
    if (isWeApp) {
      wx.removeStorageSync(this.prefix + key)
    } else {
      this.target.removeItem(this.prefix + key)
    }
  }

  clear() {
    if (isWeApp) {
      wx.clearStorage()
    } else {
      this.target.clear()
    }
  }

  getAll() {
    const result = {}

    let keys = []

    if (isWeApp) {
      const info = wx.getStorageInfoSync()
      keys = info.keys || []
    } else {
      for (let i = 0; i < this.target.length; i++) {
        keys.push(this.target.key(i))
      }
    }

    _each(keys, (key) => {
      result[key] = this.get(
        key.startsWith(this.prefix) ? key.slice(this.prefix.length) : key
      )
    })

    return keys.length > 0 ? result : null
  }
}

export default StorageFactory
