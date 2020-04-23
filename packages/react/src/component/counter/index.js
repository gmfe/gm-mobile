import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Big from 'big.js'

import { KeyboardWrap } from '../keyboard'
import SVGPlus from '../../../svg/plus.svg'
import SVGMinus from '../../../svg/minus.svg'

const Counter = ({
  value,
  min,
  max,
  precision,
  title,
  onChange,
  large,
  disabled,
  className,
  ...rest
}) => {
  const minusDisabled = value === null || value === 0 || (min && value <= min)
  const plusDisabled = max && value >= max

  // 检验是否超出大小值限制
  const checkValue = (value) => {
    if (max && value > max) {
      return value - 1
    }

    if (min && value < min) {
      return value + 1
    }

    return value
  }

  const handleChange = (type) => {
    let v = value
    if (type === 'minus') {
      if (minusDisabled) return
      // 小于0时展示为0不变
      v = value - 1 < 0 ? 0 : value - 1
      const cv = checkValue(v)
      onChange(cv)
      return
    }

    if (plusDisabled) return

    // 如果存在最小值，以最小值开始相加
    v = value + 1
    if (min && value === null) {
      v = min
    }
    const cv = checkValue(v)
    onChange(cv)
  }

  const renderValue = () => {
    // 根据设定精度展示数值
    if (value === null) {
      return ''
    }

    return Big(value).toFixed(precision)
  }

  return (
    <div
      {...rest}
      className={classNames(
        'm-counter',
        {
          'm-counter-default': !large,
          'm-counter-large': large,
          disabled,
        },
        className
      )}
    >
      <SVGMinus
        className={classNames('m-counter-minus', {
          disabled: minusDisabled,
        })}
        onClick={() => handleChange('minus')}
      />
      <KeyboardWrap
        className='m-counter-content'
        defaultValue={value}
        title={title}
        min={min}
        max={max}
        precision={precision}
        onSubmit={onChange}
      >
        {renderValue()}
      </KeyboardWrap>
      <SVGPlus
        className={classNames('m-counter-plus', {
          disabled: plusDisabled,
        })}
        onClick={() => handleChange('plus')}
      />
    </div>
  )
}

Counter.propTypes = {
  /** 当前展示值，null展示为空 */
  value: PropTypes.number,
  /** 键盘标题, 辅助展示 */
  title: PropTypes.string,
  /** 最小值, 默认为0 */
  min: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 键盘输入数字精度, 可输入几位小数 及 展示 */
  precision: PropTypes.number,
  /** + / - 按钮回调, 数字键盘确定按钮回调函数 */
  onChange: PropTypes.func.isRequired,
  /** 默认为mini尺寸 */
  large: PropTypes.bool,
  /** 禁用状态 */
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Counter.defaultProps = {
  value: null,
  min: 0,
  precision: 2,
}

export default Counter
