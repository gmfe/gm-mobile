import React, { useEffect, useRef, FC, useState, ReactNode } from 'react'
import { Flex, LayoutRoot, LayoutRootV1 } from '@gm-mobile/c-react'
import { ScrollView } from '@tarojs/components'
import PageBase, { PageProps } from './base'
import { debounce } from 'lodash'

interface PageMPProps extends PageProps {
  onRefresh?: () => Promise<any>
  onLoadMore?: () => Promise<any>
}

const PageMP: FC<PageMPProps> = ({
  children,
  onRefresh,
  onLoadMore,
  ...props
}) => {
  const [state, setState] = useState({
    refreshing: false,
    loadingMore: false,
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
    loadMore: debounce(
      async () => {
        setState((state) => {
          return {
            ...state,
            refreshing: true,
          }
        })
        try {
          onLoadMore && (await onLoadMore())
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
      1000,
      { leading: true }
    ),
  }

  return (
    <>
      <PageBase {...props}>
        {onRefresh && (
          <ScrollView
            className='m-flex'
            style={{ height: '100%' }}
            enableBackToTop
            scrollY
            refresherEnabled
            scrollWithAnimation
            scrollAnchoring
            refresherBackground='transparent'
            refresherTriggered={state.refreshing}
            lowerThreshold={50}
            onRefresherRefresh={() => methods.refresh()}
            onScrollToLower={() => methods.loadMore()}
          >
            {children}
            {state.loadingMore && (
              <Flex
                className='loading-more m-margin-tb-20 m-text-placeholder'
                alignCenter
                justifyCenter
              >
                加载中...
              </Flex>
            )}
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
