import React, { CSSProperties, FC, HtmlHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex } from '../flex'
import { View } from '../view'
import { Status } from '../status'

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
        },
        className
      )}
    >
      {loading && <Status type='loading' style={{ marginTop: '40vh' }} />}
      {error && (
        <Status
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
          {top && <View className='m-flex-none'>{top}</View>}
          <View
            className={classNames('m-page-content', pageClassName)}
            style={pageStyle}
          >
            {children}
          </View>
          {bottom && <View className='m-flex-none'>{bottom}</View>}
        </>
      )}
      {tabbar && <View className='m-page-tabbar m-flex-none'>{tabbar}</View>}
    </Flex>
  )
}

export default Page
export type { PageProps }
