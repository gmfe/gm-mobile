import React, { useEffect, useRef, FC, useState, CSSProperties } from 'react'
import { Flex, LayoutRoot, LayoutRootV1, Loading } from '@gm-mobile/c-react'
import { ScrollView, View } from '@tarojs/components'
import PageBase, { PageProps } from './base'
import { pxTransform } from '@tarojs/taro'

interface PageMPProps extends PageProps {
  /** 最大宽度，对超过最大宽度的页面做做居中变窄处理 */
  maxWidth?: number
  onRefresh?: () => Promise<any>
  /** 上滑加载更多事件。如果promise返回一个空数组，表示没有更多了 */
  onLoadMore?: () => Promise<Array<any> | undefined>
}

const PageMP: FC<PageMPProps> = ({
  children,
  maxWidth = 2048,
  onRefresh,
  onLoadMore,
  style,
  ...props
}) => {
  const { screenWidth } = wx.getSystemInfoSync()
  const transformRatio = maxWidth / screenWidth
  const transform = screenWidth > maxWidth

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

  const layoutStyle: CSSProperties = transform
    ? {
        position: 'absolute',
        width: '100%',
        height: `calc(100vh / ${transformRatio})`,
      }
    : {}

  const page = (
    <>
      <PageBase
        {...props}
        style={{
          ...style,
          height: transform ? `calc(100vh / ${transformRatio})` : undefined,
        }}
      >
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
      <LayoutRoot style={layoutStyle} />
      <LayoutRootV1 style={layoutStyle} />
    </>
  )

  if (transform) {
    return (
      <View className='transformer'>
        <View
          className='transformed-page'
          style={{
            transform: `scale(${transformRatio})`,
          }}
        >
          {page}
        </View>
      </View>
    )
  }
  return page
}

export default PageMP
export type { PageMPProps }

/** 适配后的高度，考虑ipad 大屏裁剪宽度后的比例 */
export function calcPageHeightWithMaxWidth(maxWidth = 480) {
  const { screenWidth } = wx.getSystemInfoSync()
  const transformRatio = maxWidth / screenWidth
  return `calc(100vh / ${transformRatio})`
}

export function calcPageWidthWithMaxWidth(maxWidth = 800) {
  const { screenWidth } = wx.getSystemInfoSync()
  const transformRatio = maxWidth / screenWidth
  return `calc(100vw / ${transformRatio})`
}
