import { get } from 'lodash'
import { instance } from './request'
import { axios } from 'taro-axios'
import { LocalStorage } from '@gm-mobile/mp'

// 如果有值使用此值作为接口请求域名
let privateBaseUrl: string = LocalStorage.get('privateBaseUrl') || ''

/** 私有化部署实现，监测到登录后，后续所有接口的请求域名将使用group中的private_domain字段值 */
async function configPrivateDomain(defaultBaseUrl: string) {
  instance.interceptors.request.use(async (config) => {
    const { baseURL = '', url, data = '{}' } = config
    const fullUrl = baseURL + url
    const apiName = fullUrl.split('/').reverse()[0]
    const origin = fullUrl.split('/').slice(0, 3).join('/')
    const form: any = /^\{/.test(data) ? JSON.parse(data) : {}
    switch (apiName) {
      case 'Token': {
        const group_id = form.group_id
        const group_customized_code = form.group_customized_code
        const {
          data: { groups },
          status,
        } = await axios.post(
          '/ceres/enterprise/EnterpriseService/ListLoginGroup',
          {
            group_id,
            customized_code: group_customized_code,
          },
          { baseURL: defaultBaseUrl }
        )
        if (status !== 200)
          return Promise.reject(new Error('ListLoginGroup 请求失败'))
        privateBaseUrl = get(groups, '0.private_domain_name') || ''
        LocalStorage.set('privateBaseUrl', privateBaseUrl)
        break
      }
      default:
    }
    config.baseURL = privateBaseUrl || defaultBaseUrl
    return Promise.resolve(config)
  })
}

export default configPrivateDomain
