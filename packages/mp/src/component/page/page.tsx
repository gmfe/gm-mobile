import React, { useEffect, useRef, FC } from 'react'
import {
  Page as PageBase,
  LayoutRoot,
  LayoutRootV1,
  PageProps as PageMPProps,
} from '@gm-mobile/c-react'

const PageMP: FC<PageMPProps> = (props) => {
  const refLoading = useRef<boolean | undefined>(false)
  useEffect(() => {
    // 和之前的不一样
    if (props.loading !== refLoading.current) {
      if (props.loading) {
        wx.showNavigationBarLoading()
      } else {
        wx.hideNavigationBarLoading()
      }

      refLoading.current = props.loading
    }
  }, [props.loading])

  return (
    <>
      <PageBase {...props} />
      <LayoutRoot />
      <LayoutRootV1 />
    </>
  )
}

export default PageMP
export type { PageMPProps }
