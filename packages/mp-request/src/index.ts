import { instance, Request } from './request'

import configHeaders from './config_headers'
import configTrace from './config_trace'
import configError from './config_error'
import configProgress from './config_progress'
import {
  configPrivateDomain,
  clearPrivateDomain,
} from './config_private_domain'
import { initAuth, clearAuth, setAccessToken } from './init'
import autoCancel from './auto_cancel'
export {
  initAuth,
  clearAuth,
  instance,
  Request,
  configHeaders,
  configTrace,
  configError,
  configProgress,
  setAccessToken,
  configPrivateDomain,
  clearPrivateDomain,
  autoCancel,
}
export type { Response } from './types'
