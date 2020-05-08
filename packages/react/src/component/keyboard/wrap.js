import React from 'react'
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
  ...rest
}) => {
  const handleClick = (e) => {
    onClick && onClick(e)
    Keyboard.render({
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
    <div {...rest} onClick={handleClick}>
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
