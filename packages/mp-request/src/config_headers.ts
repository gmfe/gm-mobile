import { UUID } from '@gm-mobile/c-tool'
import { instance } from './request'

function configHeaders() {
  // 小程序没有指纹，则用 UUID 代替。
  const clientId = UUID.generate()

  const clientName = __CLIENT_NAME__ // eslint-disable-line
  const version = __VERSION__ // eslint-disable-line

  instance.defaults.headers.common[
    'X-Client'
  ] = `${clientName}/${version} ${clientId}`

  instance.interceptors.request.use((config) => {
    config.headers['X-Request-Id'] = UUID.generate()

    return config
  })
}

export default configHeaders
