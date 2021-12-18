import React, { CSSProperties, FC, HtmlHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex, Status, View } from '@gm-mobile/c-react/src'
import './base.less'
import SafeBottomMP from '../safe_bottom/safe_bottom'

interface PageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  loading?: boolean
  error?: boolean
  onReload?: () => void
  white?: boolean
  header?: ReactNode
  tabbar?: ReactNode
  top?: ReactNode
  /** bottom位置自带底部安全边距，不需要和safeBottom同时使用 */
  bottom?: ReactNode
  pageClassName?: string
  pageStyle?: CSSProperties
  /** 底部安全区域 */
  safeBottom?: boolean
  /** 用于放置绝对定位组件 */
  extra?: ReactNode
  onRefresh?: () => Promise<any>
}

const Page: FC<PageProps> = ({
  loading,
  error,
  onReload,
  white,
  header,
  tabbar,
  top,
  bottom,
  children,
  className,
  pageClassName,
  pageStyle,
  safeBottom,
  extra,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      column
      className={classNames(
        'm-page',
        {
          'm-page-white': white,
          'safe-bottom': safeBottom,
        },
        className
      )}
    >
      {loading && (
        <Status
          className='m-status'
          type='loading'
          style={{ marginTop: '40vh' }}
        />
      )}
      {error && (
        <Status
          className='m-status'
          type='error'
          style={{ marginTop: '40vh' }}
          onReload={onReload}
        />
      )}
      {!loading && !error && (
        <>
          {header && (
            <Flex column none className='m-page-header m-flex-none'>
              {header}
            </Flex>
          )}
          {top && <View className='m-top m-flex-none'>{top}</View>}
          <View
            className={classNames('m-page-content', pageClassName)}
            style={pageStyle}
          >
            {children}
          </View>
          {bottom && (
            <SafeBottomMP className='m-bottom m-flex-none'>
              {bottom}
            </SafeBottomMP>
          )}
        </>
      )}
      {extra}
      {tabbar && <View className='m-page-tabbar m-flex-none'>{tabbar}</View>}
    </Flex>
  )
}

export default Page
export type { PageProps }
