import { instance } from './request'
import { getLocale } from '@gm-mobile/locales'
import _includes from 'lodash/includes'

function configError(errorCallback) {
  instance.interceptors.response.use(
    (response) => {
      const sucCode = response.config.headers['X-Guanmai-Success-Code'].split(
        ','
      )
      const json = response.data
      if (!_includes(sucCode, json.code + '')) {
        const msg = json.msg || getLocale('未知错误')
        errorCallback(msg, response)
      }

      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default configError
