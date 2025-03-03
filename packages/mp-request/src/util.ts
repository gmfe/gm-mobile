import _ from 'lodash'

import { parseUrl, stringifyUrl } from 'query-string'
import { getLocale } from '@gm-mobile/locales'
import axios, { AxiosResponse, AxiosRequestConfig } from 'taro-axios'
import { decode } from 'js-base64'

const platform = __NAME__ // eslint-disable-line

const requestUrl = '//trace.guanmai.cn/api/logs/request/'
const requestEnvUrl = '//trace.guanmai.cn/api/logs/environment/'
const accessTokenKey = 'ACCESS_TOKEN_KEY'
const authInfoKey = 'AUTH_INTERFACE_KEY'
const isProduction = process.env.NODE_ENV === 'production'

function getErrorMessage(error: { [key: string]: any }): string {
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

function atob(s: string): any {
  if (!s) return null
  try {
    // base64 -> utf-8
    return JSON.parse(decode(s))
  } catch (error) {
    console.warn(error.message)
    return null
  }
}

function parseResponseHeaders(response: AxiosResponse) {
  const responseHeaders = response.headers

  const result = (responseHeaders['grpc-message'] || '').split('|')
  const gRPCMessageDetail: string = atob(result.slice(1).join('|'))
  const gRPCMessage: string = result[0] || ''
  const gRPCStatus: number = +responseHeaders['grpc-status']
  const isNaN = _.isNaN(gRPCStatus)

  return {
    gRPCMessageDetail,
    gRPCMessage,
    gRPCStatus: isNaN ? -1 : gRPCStatus,
  }
}
function formatToResponse<T>(response: AxiosResponse<T>) {
  const { gRPCMessageDetail, gRPCMessage, gRPCStatus } = parseResponseHeaders(
    response
  )
  const data = response.data

  return {
    code: +gRPCStatus,
    message: {
      description: gRPCMessage,
      detail: gRPCMessageDetail,
    },
    response: data,
  }
}

function tailRequestTrim(
  obj: { [key: string]: any },
  result: { [key: string]: any }
) {
  _.forEach(Object.entries(obj), ([n, v]) => {
    if (v instanceof Object && !_.isArray(v)) {
      result[n] = {}
      tailRequestTrim(v, result[n])
    } else {
      result[n] = typeof v === 'string' ? v.trim() : v
    }
  })

  return result
}

function requestTrim(obj: { [key: string]: any }) {
  // 判断一下循环引用，如果有就抛错误
  JSON.stringify(obj)

  return tailRequestTrim(obj, {})
}

function report(url: string, data: any, options?: AxiosRequestConfig): void {
  if (!isProduction) {
    return
  }

  // todo: 后续做
  // data.metaData = Object.assign({}, data.metaData, getMetaData())

  setTimeout(() => {
    doFetch(url, data, options)
  }, 10)

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

/* eslint-enable */
// 约定 data requestId 字段，提供具设置 X-Guanmai-Request-Id，方便查看到 nginx 的时间
function doFetch(url: string, data: any, options?: AxiosRequestConfig): void {
  options = options || {}
  // 可能 JSON.stringify 报错，try catch 下
  try {
    axios({
      url: getUrlRandom(url),
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

function getUrlRandom(url: string): string {
  const obj = parseUrl(url)
  obj.query.v = '' + Math.random()

  return stringifyUrl(obj)
}

/**
 * 格式化错误信息
 *
 * 异常编码不存在或<2000:
 * <异常编码> <异常详细信息或异常编码翻译> rid: <请求ID> 日期: <请求时间>
 *
 * 异常编码>=2000:
 * <异常编码> <异常详细信息或异常编码翻译>
 */
function formatErrorMessage(
  message: string,
  statusCodeMap: Record<string, string>,
  response?: AxiosResponse
): string {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  const code = response?.data?.code || 0
  let customizeReason = response?.data.message.detail?.reason
  const codeMessage = statusCodeMap[code]
  const rid = response?.config.headers['X-Request-Id']
  const timestamp =
    response?.config.headers['X-Timestamp'] || new Date().valueOf()
  const formatedDate = formatDate(Number(timestamp))

  const isGrpcStatusCode = code < 2000

  if (!customizeReason) {
    customizeReason = codeMessage || message || '服务异常'
  }

  let reason = `${code} ${customizeReason}`

  // 服务异常没有 rid
  if (isGrpcStatusCode && customizeReason !== '服务异常') {
    reason += ` rid: ${rid} 日期: ${formatedDate}`
  }

  return reason
}

export {
  requestUrl,
  requestEnvUrl,
  getErrorMessage,
  accessTokenKey,
  authInfoKey,
  platform,
  report,
  isProduction,
  requestTrim,
  formatToResponse,
  formatErrorMessage,
}
