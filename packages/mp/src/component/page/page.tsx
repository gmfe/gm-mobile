import React, { useEffect, useRef, FC, useState } from 'react'
import { LayoutRoot, LayoutRootV1 } from '@gm-mobile/c-react'
import { ScrollView } from '@tarojs/components'
import PageBase, { PageProps as PageMPProps } from './base'

const PageMP: FC<
  PageMPProps & {
    onRefresh?: () => Promise<any>
  }
> = ({ children, onRefresh, ...props }) => {
  const [state, setState] = useState({
    refreshing: false,
  })
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
  const methods = {
    async refresh() {
      setState((state) => {
        return {
          ...state,
          refreshing: true,
        }
      })
      try {
        onRefresh && (await onRefresh())
      } catch (err) {
        console.error(err)
      }
      setState((state) => {
        return {
          ...state,
          refreshing: false,
        }
      })
    },
  }

  return (
    <>
      <PageBase {...props}>
        {onRefresh && (
          <ScrollView
            className='m-flex'
            style={{ height: '100%' }}
            scrollY
            refresherEnabled
            refresherBackground='transparent'
            refresherTriggered={state.refreshing}
            onRefresherRefresh={methods.refresh}
          >
            {children}
          </ScrollView>
        )}
        {!onRefresh && children}
      </PageBase>
      <LayoutRoot />
      <LayoutRootV1 />
    </>
  )
}

export default PageMP
export type { PageMPProps }
