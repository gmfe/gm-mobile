import axios from 'taro-axios'
import { getLocale } from '@gm-mobile/locales'
import isArray from 'lodash/isArray'
import { processPostData, getErrorMessage } from './util'

const instance = axios.create({
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Guanmai-Timeout': '30000',
    'X-Guanmai-Success-Code': '0',
  },
})

// 处理下数据
instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = processPostData(config.data)
  }

  return config
})

function httpReject(error) {
  const message = getErrorMessage(error)

  throw new Error(message)
}

function httpResolve(res, sucCode) {
  const json = res.data
  if (!sucCode.includes(json.code)) {
    throw new Error(json.msg || getLocale('未知错误'))
  }

  return json
}

class RequestBase {
  constructor(url, config = {}) {
    this._sucCode = [0]
    this._config = {
      url,
      headers: {},
      ...config,
    }
    this._data = {}
  }

  code(code) {
    let codes = code
    if (!isArray(code)) {
      codes = [code]
    }
    this._sucCode = this._sucCode.concat(codes)
    this._config.headers['X-Guanmai-Success-Code'] = this._sucCode.join(',')
    return this
  }

  timeout(timeout) {
    this._config.timeout = timeout
    this._config.headers['X-Guanmai-Timeout'] = `${timeout}`
    return this
  }

  data(data) {
    this._data = data
    return this
  }

  json(data) {
    this._data = JSON.stringify(data)
    return this
  }

  get() {
    this._config.params = this._data
    return instance
      .request(this._config)
      .then((res) => httpResolve(res, this._sucCode), httpReject)
  }

  post() {
    this._config.data = this._data
    this._config.method = 'post'
    return instance
      .request(this._config)
      .then((res) => httpResolve(res, this._sucCode), httpReject)
  }
}

function Request(url, config) {
  return new RequestBase(url, config)
}

export { instance, Request }
