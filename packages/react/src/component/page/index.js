import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Flex from '../flex'
// import CSSVariable from '../../css_variable'
// import { KEYBOARD_RENDER, KEYBOARD_HIDE } from '../keyboard/util'

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
  // const [hasKeyboard, setHasKeyboard] = useState(false)

  // const handleKeyboardRender = () => {
  //   setHasKeyboard(true)
  // }

  // const handleKeyboardHide = () => {
  //   setHasKeyboard(false)
  // }

  // const getKeyboardHeight = () => {
  //   let tabbarHeight = 0
  //   if (!hasKeyboard) {
  //     return
  //   }

  //   if (tabbar) {
  //     const _height = CSSVariable.getValue('--m-size-tabbar-height')
  //     tabbarHeight = Number(_height.split('px')[0] || 0)
  //   }
  //   // 暂时先定 275px
  //   const keyboardHeight = 275 - tabbarHeight
  //   return keyboardHeight
  // }

  // // 监听页面键盘事件
  // useEffect(() => {
  //   window.addEventListener(KEYBOARD_RENDER, handleKeyboardRender)
  //   window.addEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  //   return () => {
  //     window.removeEventListener(KEYBOARD_RENDER, handleKeyboardRender)
  //     window.removeEventListener(KEYBOARD_HIDE, handleKeyboardHide)
  //   }
  // }, [])

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
      {/* {hasKeyboard && <div style={{ height: getKeyboardHeight() }} />} */}
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
