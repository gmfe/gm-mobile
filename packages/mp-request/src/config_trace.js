import { instance } from './request'
import { requestUrl, doFetch, isProduction } from './util'
const timeMap = {}

function report(url, body) {
  setTimeout(() => {
    doFetch(url, body)
  }, 10)
}

export function traceRequestInterceptor(options, config) {
  const requestId = config.headers['X-Guanmai-Request-Id']
  timeMap[requestId] = Date.now()
  const { url, params, data } = config

  if (options.canRequest && options.canRequest(url)) {
    report(requestUrl + options.platform, {
      url,
      requestId,
      metaData: options.getMetaData && options.getMetaData(),
      params: JSON.stringify(params),
      data: JSON.stringify(data),
      reqTime: new Date() + '',
    })
  }

  return config
}

function traceResponseInterceptor(options, response) {
  const json = response.data
  const { url, headers, params, data, request } = response.config
  const requestId = headers['X-Guanmai-Request-Id']

  report(requestUrl + options.platform, {
    url,
    metaData: options.getMetaData && options.getMetaData(),
    params: JSON.stringify(params),
    data: JSON.stringify(data),
    requestId,
    resCode: json.code,
    resMsg: json.msg,
    status: request && request.status,
    resTime: new Date() + '',
    cookie: headers && headers.Cookie,
    time: timeMap[requestId] ? Date.now() - timeMap[requestId] : '',
  })

  // 释放内存
  if (timeMap[requestId]) {
    delete timeMap[requestId]
  }

  return response
}

function doInterceptors(options = {}) {
  instance.interceptors.request.use(traceRequestInterceptor.bind(null, options))
  instance.interceptors.response.use(
    traceResponseInterceptor.bind(null, options),
    (error) => {
      return Promise.reject(error)
    }
  )
}

function configTrace(options) {
  if (!isProduction) {
    return
  }

  doInterceptors(options)
}

export default configTrace
