import { getLocale } from '@gm-mobile/locales'
import React, { useState, useEffect, FC, HtmlHTMLAttributes } from 'react'
import classNames from 'classnames'
import { View, Toast, Input } from '@gm-mobile/c-react'
import _ from 'lodash'
import Big from 'big.js'
import { BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

interface CounterProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** +/- 号回调，数字确认键盘及失焦回调 */
  onChange: (value: string) => void
  /** 展示值 */
  value?: string
  /** 最小值, 默认为0 */
  min?: number
  /** 最大值 */
  max?: number
  precision?: number
  /** 关闭键盘上下限校验 */
  closeCheck?: boolean
  /** 获取焦点, 微信版本 6.3.30, focus 属性设置无效 */
  focus?: boolean
  /** 禁用状态 */
  disabled?: boolean
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition?: boolean
  /** 触发最小或最大值时，回调 */
  getErrorMsg?: (value: ErrorMsg) => string
}

interface ErrorMsg {
  value: string
  min?: number
  max?: number
  precision?: number
}

const text2Number = (value: string) => {
  if (value === '') {
    return 0
  }
  return _.isNaN(parseFloat(value)) ? '' : parseFloat(value)
}

const handleErrorMsg = ({ value, min, max, precision }: ErrorMsg) => {
  let msg = null
  const cv = text2Number(value)
  if (max && cv > max) {
    msg = `${getLocale('请输入小于')} ${max} ${getLocale('的数')}`
  } else if (min && cv < min) {
    msg = `${getLocale('请输入大于')} ${min} ${getLocale('的数')}`
  }

  if (min && max && msg) {
    msg = `${getLocale('请输入大于')} ${min} ${getLocale(
      '小于'
    )} ${max} ${getLocale('的数')}`
  }

  // 精度校验
  const num = value.split('.')
  if (num.length > 1 && num[1].length > precision!) {
    msg =
      msg ||
      `${getLocale('最多只能输入小数点后')} ${precision} ${getLocale('位')}`
  }
  return msg
}

const Counter: FC<CounterProps> = ({
  value = '',
  min = 0,
  max,
  onChange,
  focus,
  disabled,
  getErrorMsg = handleErrorMsg,
  precision = 2,
  adjustPosition,
  className,
  closeCheck,
  ...rest
}) => {
  const [selfValue, setSelfValue] = useState(value)
  useEffect(() => {
    setSelfValue(value)
  }, [value])

  const plusDisabled = !disabled && max && text2Number(selfValue) >= max
  const minusDisabled =
    !disabled && (selfValue === '' || text2Number(selfValue) === 0)

  // 检验是否超出大小值限制
  const checkValue = (value: number, type: 'minus' | 'plus') => {
    if (max && value > max) {
      return max
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

    let v = text2Number(selfValue) as number
    const _precision = _.includes(selfValue, '.') ? precision : 0
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
    if (min && selfValue === '') {
      v = min
    }
    const cv = Big(checkValue(v, type)).toFixed(_precision)
    onChange(cv)
  }

  const handleInput = (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    const { value } = e.detail

    // 优化交互体验,0和空均代表不添加商品
    if (value !== '' && !closeCheck) {
      checkError(value)
    }
    setSelfValue(value)
  }

  const checkError = (v: string) => {
    const mes = getErrorMsg({ value: v, min, max, precision })
    mes && Toast.tip(mes)
  }

  const handleFinally = () => {
    onChange(selfValue)
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
        value={selfValue}
        focus={focus}
        adjustPosition={adjustPosition}
        // @ts-ignore
        onInput={handleInput}
        onBlur={handleFinally}
        onConfirm={handleFinally}
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

export default Counter
export type { CounterProps }
