import React, { useEffect, useRef } from 'react'
import { Page as PageBase, LayoutRoot } from '@gm-mobile/c-react'

const PageMP = (props) => {
  const refLoading = useRef(false)
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
    </>
  )
}

PageMP.propTypes = {
  ...PageBase.propTypes,
}

export default PageMP
