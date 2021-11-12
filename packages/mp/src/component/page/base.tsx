import React, { CSSProperties, FC, HtmlHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex, Status, View } from '@gm-mobile/c-react/src'
import './base.less'

interface PageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  loading?: boolean
  error?: boolean
  onReload?: () => void
  white?: boolean
  header?: ReactNode
  tabbar?: ReactNode
  top?: ReactNode
  bottom?: ReactNode
  pageClassName?: string
  pageStyle?: CSSProperties
  /** 去掉底部安全区域 */
  withoutSafeBottom?: boolean
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
  withoutSafeBottom,
  ...rest
}) => {
  const { safeArea, screenHeight } = wx.getSystemInfoSync()
  const paddingBottom = screenHeight - safeArea.bottom
  return (
    <Flex
      {...rest}
      column
      className={classNames(
        'm-page',
        {
          'm-page-white': white,
          'without-safe-bottom': withoutSafeBottom,
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
            <View className='m-bottom m-flex-none'>
              {React.cloneElement(bottom as React.ReactElement, {
                style: {
                  paddingBottom:
                    paddingBottom > 0
                      ? `${paddingBottom}px!important`
                      : undefined,
                },
              })}
            </View>
          )}
        </>
      )}
      {tabbar && <View className='m-page-tabbar m-flex-none'>{tabbar}</View>}
    </Flex>
  )
}

export default Page
export type { PageProps }
