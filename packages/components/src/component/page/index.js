import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import View from '../view'

const Page = ({
  className,
  pageClassName,
  white,
  header,
  tabbar,
  top,
  bottom,
  children,
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
      {header && (
        <Flex column none className='m-page-header m-flex-none'>
          {header}
        </Flex>
      )}
      {top && <View className='m-flex-none'>{top}</View>}
      <View className={classNames('m-page-content', pageClassName)}>
        {children}
      </View>
      {bottom && <View className='m-flex-none'>{bottom}</View>}
      {tabbar && <View className='m-page-tabbar m-flex-none'>{tabbar}</View>}
    </Flex>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pageClassName: PropTypes.string,
  white: PropTypes.bool,
  header: PropTypes.node,
  tabbar: PropTypes.node,
  top: PropTypes.node,
  bottom: PropTypes.node,
}

export default Page
