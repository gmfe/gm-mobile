import React, { FC, HtmlHTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Big from 'big.js'
import { KeyboardWrap } from '../keyboard'

interface CounterProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** + / - 按钮回调, 数字键盘确定按钮回调函数 */
  onChange: (value: string) => void
  /** 当前展示值 */
  value?: string
  /** 键盘标题, 辅助展示 */
  title?: string
  /** 最小值, 默认为0 */
  min?: number
  /** 最大值 */
  max?: number
  /** 键盘输入数字精度, 可输入几位小数 及 展示 */
  precision?: number
  /** 默认为mini尺寸 */
  large?: boolean
  /** 禁用状态 */
  disabled?: boolean
  /** 回调函数, 自定义不同情况下的错误提示信息, 参数为value, min, max, precision
   * 满足条件返回错误信息，string类型
   * 否则返回null
   */
  getErrorMsg?: (value: CounterErrorMsg) => string
}
interface CounterErrorMsg {
  value: string
  min?: number
  max?: number
  precision?: number
}

const Counter: FC<CounterProps> = ({
  value = '',
  min = 0,
  max,
  precision = 2,
  title,
  onChange,
  large,
  disabled,
  getErrorMsg,
  className,
  ...rest
}) => {
  const text2Number = (value: string) => {
    if (value === '') {
      return 0
    }
    return _.isNaN(parseFloat(value)) ? '' : parseFloat(value)
  }

  const plusDisabled = max && text2Number(value) >= max
  const minusDisabled = value === '' || text2Number(value) === 0

  // 检验是否超出大小值限制
  const checkValue = (value: number, type: 'minus' | 'plus') => {
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

  const handleChange = (type: 'minus' | 'plus') => {
    if (disabled) {
      return
    }

    let v = text2Number(value!) as number
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
        <i
          className={classNames('m-font m-font-minus m-counter-minus', {
            disabled: minusDisabled && !disabled,
          })}
        />
      </div>
      <KeyboardWrap
        defaultValue={value}
        title={title}
        min={min}
        max={max}
        precision={precision}
        onSubmit={onChange}
        getErrorMsg={getErrorMsg}
        disabled={disabled}
      >
        <div className='m-counter-content-text'>{value}</div>
      </KeyboardWrap>
      <div className='m-counter-icon' onClick={() => handleChange('plus')}>
        <i
          className={classNames('m-font m-font-plus m-counter-plus', {
            disabled: plusDisabled && !disabled,
          })}
        />
      </div>
    </div>
  )
}

export default Counter
export type { CounterProps, CounterErrorMsg }
