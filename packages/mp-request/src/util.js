import _map from 'lodash/map'
import _pickBy from 'lodash/pickBy'
import { getLocale } from '@gm-mobile/locales'
import axios from 'taro-axios'

const requestUrl = 'https://trace.guanmai.cn/api/logs/request/'
const requestEnvUrl = 'https://trace.guanmai.cn/api/logs/environment/'

const isProduction = process.env.NODE_ENV === 'production'

function param(obj) {
  // encodeURIComponent
  return _map(obj, function (v, k) {
    return [encodeURIComponent(k), '=', encodeURIComponent(v)].join('')
  })
    .join('&')
    .replace(/%20/g, '+')
}

function processPostData(data) {
  let body
  if (toString.call(data) !== '[object Object]') {
    // json string 和 其他情况
    body = data
  } else {
    // object

    // 过滤null  undefined 只Object 类型。
    // 会修改，所以 ...
    data = _pickBy({ ...data }, (value) => {
      return value !== null && value !== undefined
    })

    body = param(data)
  }

  return body
}

function getErrorMessage(error) {
  let message
  if (error.response) {
    message = `${error.response.status} ${error.response.statusText}`
  } else if (error.request) {
    if (error.message && error.message.includes('timeout')) {
      message = getLocale('连接超时')
    } else {
      message = getLocale('服务器错误')
    }
  } else {
    message = error.message
  }

  return message
}

function doFetch(url, data, options) {
  options = options || {}
  try {
    axios({
      url: `${url}?v=${Math.random()}`,
      method: 'post',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Guanmai-Request-Id': `${data.requestId}`,
        ...options.headers,
      },
      ...options,
    })
  } catch (err) {
    console.warn(err)
  }
}

export {
  requestUrl,
  requestEnvUrl,
  processPostData,
  getErrorMessage,
  doFetch,
  isProduction,
}
