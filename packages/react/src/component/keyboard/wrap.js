import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Keyboard from './keyboard'

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
  keyboardId,
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
      defaultValue,
      title,
      onSubmit,
      min,
      max,
      precision,
      getErrorMsg,
      keyboardId,
    })
  }

  return (
    <div
      ref={wrapRef}
      {...rest}
      onClick={handleClick}
      data-label='gm_mobile_keyboard'
    >
      {children}
    </div>
  )
}

KeyboardWrap.propTypes = {
  ...Keyboard.propTypes,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default KeyboardWrap
