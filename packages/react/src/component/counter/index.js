import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
  getErrorMsg,
  className,
  ...rest
}) => {
  const text2Number = (value) => {
    if (value === '') {
      return 0
    }
    return _.isNaN(parseFloat(value)) ? '' : parseFloat(value)
  }

  const plusDisabled = max && text2Number(value) >= max
  const minusDisabled = value === '' || text2Number(value) === 0
  const [currentValue, setCurrentValue] = useState(value)

  // 检验是否超出大小值限制
  const checkValue = (value, type) => {
    if (max && value > max) {
      return value - 1
    }

    if (min && value < min) {
      if (type === 'plus') {
        return min
      }
      return 0
    }

    return value
  }

  const handleChange = (type) => {
    let v = text2Number(value)
    const _precision = _.includes(value, '.') ? precision : 0
    if (type === 'minus') {
      if (minusDisabled) return
      // 小于0时展示为0不变
      v = v - 1 < 0 ? 0 : v - 1
      const cv = Big(checkValue(v, type)).toFixed(_precision)
      setCurrentValue(cv)
      onChange(cv)
      return
    }

    if (plusDisabled) return

    // 如果存在最小值，以最小值开始相加
    v = v + 1
    if (min && value === '') {
      v = min
    }
    const cv = Big(checkValue(v, type)).toFixed(_precision)
    setCurrentValue(cv)
    onChange(cv)
  }

  const handleKeyboardValueChange = (value) => {
    setCurrentValue(value)
    onChange(value)
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
      <div className='m-counter-icon' onClick={() => handleChange('minus')}>
        <SVGMinus
          className={classNames('m-counter-minus', {
            disabled: minusDisabled,
          })}
        />
      </div>
      <KeyboardWrap
        defaultValue={currentValue}
        title={title}
        min={min}
        max={max}
        precision={precision}
        getErrorMsg={getErrorMsg}
        onChange={handleKeyboardValueChange}
      >
        <div className='m-counter-content-text'>{currentValue}</div>
      </KeyboardWrap>
      <div className='m-counter-icon' onClick={() => handleChange('plus')}>
        <SVGPlus
          className={classNames('m-counter-plus', {
            disabled: plusDisabled,
          })}
        />
      </div>
    </div>
  )
}

Counter.propTypes = {
  /** 当前展示值 */
  value: PropTypes.string,
  /** 键盘标题, 辅助展示 */
  title: PropTypes.string,
  /** 最小值, 默认为0 */
  min: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 键盘输入数字精度, 可输入几位小数 及 展示 */
  precision: PropTypes.number,
  /** 数值更新回调 */
  onChange: PropTypes.func.isRequired,
  /** 默认为mini尺寸 */
  large: PropTypes.bool,
  /** 禁用状态 */
  disabled: PropTypes.bool,
  /** 回调函数, 自定义不同情况下的错误提示信息, 参数为value, min, max, precision
   * 满足条件返回错误信息，string类型
   * 否则返回null
   */
  getErrorMsg: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Counter.defaultProps = {
  value: '',
  min: 0,
  precision: 2,
}

export default Counter
