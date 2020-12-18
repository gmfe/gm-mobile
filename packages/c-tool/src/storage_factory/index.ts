import _ from 'lodash'
import is from '../is'

const isWeApp = is.weApp()

class StorageFactory {
  prefix: string
  target?: Storage

  constructor(prefix: string, target?: Storage) {
    // @ts-ignore
    this.prefix = __NAME__ + `_${prefix}`
    this.target = target
  }

  set(key: string, value: any): void {
    try {
      if (isWeApp) {
        wx.setStorageSync(`${this.prefix}${key}`, value)
      } else {
        ;(this.target as Storage).setItem(
          `${this.prefix}${key}`,
          JSON.stringify(value)
        )
      }
    } catch (err) {
      console.warn('Storage set error', err)
    }
  }

  get(key: string): any {
    try {
      let value: any

      if (isWeApp) {
        value = wx.getStorageSync(this.prefix + key)
      } else {
        value = (this.target as Storage).getItem(this.prefix + key)
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

  remove(key: string): void {
    if (isWeApp) {
      wx.removeStorageSync(this.prefix + key)
    } else {
      ;(this.target as Storage).removeItem(this.prefix + key)
    }
  }

  clear() {
    if (isWeApp) {
      wx.clearStorage()
    } else {
      ;(this.target as Storage).clear()
    }
  }

  getAll() {
    const result: { [key: string]: any } = {}

    let keys = []

    if (isWeApp) {
      const info = wx.getStorageInfoSync()
      keys = info.keys || []
    } else {
      for (let i = 0; i < (this.target as Storage).length; i++) {
        keys.push((this.target as Storage).key(i))
      }
    }

    _.each(keys, (key) => {
      if ((key as string).startsWith(this.prefix)) {
        result[key as string] = this.get(
          (key as string).slice(this.prefix.length)
        )
      }
    })

    return keys.length > 0 ? result : null
  }
}

export default StorageFactory
