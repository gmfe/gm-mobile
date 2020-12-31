import { instance, Request } from './request'

import configHeaders from './config_header'
import configTrace from './config_trace'
import configError from './config_error'
import configProgress from './config_progress'
import { initAuth, clearAuth } from './init'

export {
  initAuth,
  clearAuth,
  instance,
  Request,
  configHeaders,
  configTrace,
  configError,
  configProgress,
}
export type { Response } from './types'
