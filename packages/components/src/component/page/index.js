import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import View from '../view'
import Loading from '../loading'

const Page = ({
  loading,
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
      {loading ? (
        <View style={{ marginTop: '40vh' }} className='m-text-center'>
          正在加载...
        </View>
      ) : (
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
