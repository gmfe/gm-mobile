import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Flex from '../flex'
import CSSVariable from '../../css_variable'
import {
  KEYBOARD_EVENT,
  KEYBOARD_RENDER,
  KEYBOARD_ONHIDE,
} from '../keyboard/util'

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
  // 接收通知
  const handleKeyboardEvent = (event) => {
    // 根据事件类型做处理
    if (event.detail.eventName === KEYBOARD_RENDER) {
      // 是否存在tabbar, tabbar无需展示
      const tabbarDom = document.querySelector('.m-page-tabbar')
      let tabbarHeight = 0
      if (tabbarDom) {
        // 拿到tabbar的高度
        const _height = CSSVariable.getValue('--m-size-tabbar-height')
        tabbarHeight = Number(_height.split('px')[0] || 0)
      }

      // 预留一定空间给键盘, 键盘固定高度为 275px, 存在 tabbar 时减去 tabbar高度
      const pageDom = document.querySelector('.m-page')
      if (pageDom) {
        const bottomOffset = 275 - tabbarHeight
        pageDom.style.height = `calc(100vh - ${bottomOffset}px)`
      }
    } else if (event.detail.eventName === KEYBOARD_ONHIDE) {
      // 取消页面操作
      const pageDom = document.querySelector('.m-page')
      if (pageDom) {
        pageDom.style.height = '100vh'
      }
    }
  }

  // 监听页面键盘事件
  useEffect(() => {
    window.addEventListener(KEYBOARD_EVENT, handleKeyboardEvent)
    return () => {
      window.removeEventListener(KEYBOARD_EVENT, handleKeyboardEvent)
    }
  }, [])

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
      {top && <div className='m-flex-none'>{top}</div>}
      <div className={classNames('m-page-content', pageClassName)}>
        {children}
      </div>
      {bottom && <div className='m-flex-none'>{bottom}</div>}
      {tabbar && <div className='m-page-tabbar m-flex-none'>{tabbar}</div>}
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
