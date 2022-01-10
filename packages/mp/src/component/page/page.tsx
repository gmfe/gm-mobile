import React, { useEffect, useRef, FC, useState, ReactNode } from 'react'
import { Flex, LayoutRoot, LayoutRootV1, Loading } from '@gm-mobile/c-react'
import { ScrollView } from '@tarojs/components'
import PageBase, { PageProps } from './base'
import { pxTransform } from '@tarojs/taro'

interface PageMPProps extends PageProps {
  onRefresh?: () => Promise<any>
  /** 上滑加载更多事件。如果promise返回一个空数组，表示没有更多了 */
  onLoadMore?: () => Promise<Array<any> | undefined>
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

  // Page加载状态
  const refLoading = useRef<boolean | undefined>(false)
  useEffect(() => {
    if (props.loading !== refLoading.current) {
      if (props.loading) {
        wx.showNavigationBarLoading()
      } else {
        wx.hideNavigationBarLoading()
      }

      refLoading.current = props.loading
    }
  }, [props.loading])

  const refresh = async () => {
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
  }

  const loadMore = async () => {
    console.log('load more')
    setState((state) => {
      return {
        ...state,
        loadingMore: true,
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
        loadingMore: false,
      }
    })
  }
  const withScrollView = !!onRefresh || !!onLoadMore

  return (
    <>
      <PageBase {...props}>
        {withScrollView && (
          <ScrollView
            className='m-flex'
            style={{ height: '100%' }}
            enableBackToTop
            scrollY
            refresherEnabled={!!onRefresh}
            scrollWithAnimation
            scrollAnchoring
            refresherBackground='transparent'
            refresherTriggered={state.refreshing}
            lowerThreshold={50}
            onRefresherRefresh={onRefresh ? () => refresh() : undefined}
            onScrollToLower={onLoadMore ? () => loadMore() : undefined}
          >
            {children}
            {state.loadingMore && (
              <Flex height={pxTransform(60)} alignCenter justifyCenter>
                <Loading style={{ opacity: 0.5 }} />
              </Flex>
            )}
          </ScrollView>
        )}
        {!withScrollView && children}
      </PageBase>
      <LayoutRoot />
      <LayoutRootV1 />
    </>
  )
}

export default PageMP
export type { PageMPProps }
