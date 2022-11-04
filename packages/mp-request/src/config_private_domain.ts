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
        // #region 已知目前三种登录方式：
        // 1、group_id 使用企业id登录，如轻巧版
        // 2、group_customized_code 使用自定义编码登录，如采购助手
        // 3、wechat_app_id 使用绑定了企业的应用id登录，通过GetApplicationRelation取得group_id，如eshop
        // 故以下三个一定存在一个
        const group_id: string | undefined = form.group_id
        const group_customized_code: string | undefined =
          form.group_customized_code
        const wechat_app_id: string | undefined = form.wechat_app_id
        // #endregion
        const getPrivateBaseUrl = async ({
          group_id,
          customized_code,
        }: {
          group_id?: string
          customized_code?: string
        }) => {
          const {
            data: { groups },
          } = await axios.post(
            '/ceres/enterprise/EnterpriseService/ListLoginGroup',
            { group_id, customized_code },
            { baseURL: defaultBaseUrl }
          )
          return get(groups, '0.private_domain_name') || ''
        }
        // 登录1和登录2
        if (group_id || group_customized_code) {
          privateBaseUrl =
            (await getPrivateBaseUrl({
              group_id,
              customized_code: group_customized_code,
            })) || ''
          LocalStorage.set('privateBaseUrl', privateBaseUrl)
        } else if (wechat_app_id) {
          // 登录3
          const {
            data: { group_id },
          } = await axios.post(
            '/ceres/preference/PreferenceService/GetApplicationRelation',
            {
              application_key: wechat_app_id,
              application_type: 1,
            },
            { baseURL: defaultBaseUrl }
          )
          privateBaseUrl = (await getPrivateBaseUrl({ group_id })) || ''
          LocalStorage.set('privateBaseUrl', privateBaseUrl)
        } else {
          console.warn('不该来到这里')
        }
        break
      }
      default:
    }
    config.baseURL = privateBaseUrl || defaultBaseUrl
    return Promise.resolve(config)
  })
}

export default configPrivateDomain
