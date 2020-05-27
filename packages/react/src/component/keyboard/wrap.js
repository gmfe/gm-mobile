import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Keyboard from './keyboard'
import { KEYBOARDLABEL } from './util'

const KeyboardWrap = ({
  defaultValue,
  title,
  onSubmit,
  min,
  max,
  precision,
  children,
  onClick,
  getErrorMsg,
  ...rest
}) => {
  const wrapRef = useRef(null)

  const handleClick = (e) => {
    // 点击元素滚动到可视区域
    setTimeout(() => {
      wrapRef.current &&
        wrapRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 50)

    // 触发事件
    onClick && onClick(e)
    Keyboard.render({
      key: Math.random(),
      defaultValue,
      title,
      onSubmit,
      min,
      max,
      precision,
      getErrorMsg,
    })
  }

  return (
    <div
      {...rest}
      ref={wrapRef}
      onClick={handleClick}
      data-label={KEYBOARDLABEL}
    >
      {children}
    </div>
  )
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default KeyboardWrap
