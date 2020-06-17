import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Input } from '@tarojs/components'
import { View } from '@gm-mobile/components'
import _ from 'lodash'
import Big from 'big.js'

const Counter = ({
  value,
  min,
  max,
  precision,
  onChange,
  focus,
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

  // // 检验是否超出大小值限制
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
    onChange(cv)
  }

  const handleInput = (e) => {
    onChange(e.detail.value)
  }

  return (
    <View
      {...rest}
      className={classNames(
        'm-counter m-counter-default',
        {
          disabled,
        },
        className
      )}
    >
      <View
        className={classNames('m-font m-font-minus-circle m-counter-minus', {
          disabled: minusDisabled,
        })}
        onClick={() => handleChange('minus')}
      />
      <Input
        className='m-counter-content-text'
        type='digit'
        disabled={disabled}
        value={text2Number(value)}
        onInput={handleInput}
      />
      <View
        className={classNames('m-font m-font-plus-circle m-counter-plus', {
          disabled: plusDisabled,
        })}
        onClick={() => handleChange('plus')}
      />
    </View>
  )
}

Counter.propTypes = {
  /** 当前展示值 */
  value: PropTypes.string,
  /** 最小值, 默认为0 */
  min: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 获取焦点 */
  focus: PropTypes.bool,
  /** 键盘输入数字精度, 可输入几位小数 及 展示 */
  precision: PropTypes.number,
  /** + / - 按钮回调, 数字键盘确定按钮回调函数 */
  onChange: PropTypes.func.isRequired,
  /** 禁用状态 */
  disabled: PropTypes.bool,
  /** 设置键盘右下角按钮的文字 */
  confirmType: PropTypes.oneOf(['send', 'search', 'next', 'go', 'done']),
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: PropTypes.bool,
  getErrorMsg: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Counter.defaultProps = {
  value: '',
  min: 0,
  precision: 2,
  // todo: 多语
  confirmType: 'done',
}

export default Counter
