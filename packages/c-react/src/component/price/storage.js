import { StorageFactory } from '@gm-mobile/c-tool'

const LocalStorage = new StorageFactory('_gm-mobile_', window.localStorage)

export default LocalStorage
