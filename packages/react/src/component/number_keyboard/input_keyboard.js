import React from 'react'
import PropTypes from 'prop-types'

import NumberKeyboard from './number_keyboard'

const InputKeyboard = (props) => {
  const {
    title,
    onSubmit,
    min,
    max,
    precision,
    children,
    className,
    ...rest
  } = props

  const handleClick = () => {
    NumberKeyboard.render({
      title,
      onSubmit,
      min,
      max,
      precision,
      ...rest,
    })
  }

  return (
    <div className='m-input-keyboard' onClick={handleClick}>
      {children}
    </div>
  )
}

InputKeyboard.propTypes = {
  /** 初始默认值, null表示为空值 */
  defaultValue: PropTypes.number,
  /** 标题, 辅助展示 */
  title: PropTypes.string,
  /** 确定回调函数 */
  onSubmit: PropTypes.func.isRequired,
  /** 最小值 */
  min: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 精度, 可输入几位小数 */
  precision: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}

InputKeyboard.defaultProps = {
  defaultValue: null,
  precision: 2,
}

export default InputKeyboard
