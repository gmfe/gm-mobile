import LocalStorage from './storage'
import useFirstDidShow from './hook/use_first_did_show'

/** 不提供LayoutRoot, Page，请用 PageMP */
export * from '@gm-mobile/c-react'

export * from './component/image'
export * from './component/page'
export * from './component/counter'
export * from './component/status_bar'
export * from './component/map'
export * from './component/swiper'
export * from './component/safe_header'
export { LocalStorage, useFirstDidShow }
