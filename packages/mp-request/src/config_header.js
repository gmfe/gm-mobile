import { UUID } from '@gm-mobile/tool'
import { instance } from './request'

function configHeaders({ clientName, version }) {
  const clientId = UUID.generate()

  instance.defaults.headers.common[
    'X-Guanmai-Client'
  ] = `${clientName}/${version} ${clientId}`

  instance.interceptors.request.use((config) => {
    config.headers['X-Guanmai-Request-Id'] = UUID.generate()

    return config
  })
}

export default configHeaders
