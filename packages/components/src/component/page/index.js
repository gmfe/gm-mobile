import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import View from '../view'
import Button from '../button'

const Page = ({
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
      {loading && (
        <View style={{ marginTop: '40vh' }} className='m-text-center'>
          正在加载...
        </View>
      )}
      {error && (
        <View style={{ marginTop: '40vh' }} className='m-text-center'>
          加载失败
          <View>
            <Button
              mini
              type='primary'
              onClick={() => {
                onReload()
              }}
            >
              重新加载
            </Button>
          </View>
        </View>
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

Page.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onReload: PropTypes.bool,
  children: PropTypes.node,
  white: PropTypes.bool,
  header: PropTypes.node,
  tabbar: PropTypes.node,
  top: PropTypes.node,
  bottom: PropTypes.node,
  pageClassName: PropTypes.string,
  pageStyle: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Page
