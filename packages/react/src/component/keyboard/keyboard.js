import { getLocale } from '@gm-mobile/locales'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import BaseKeyboard from './_keyboard'
import Flex from '../flex'
import Button from '../button'
import { TYPE, text2Number } from './util'
import KeyboardStatics from './statics'
import Toast from '../toast'

const handleErrorMsg = ({ value, min, max, precision }) => {
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
  if (num.length > 1 && num[1].length > precision) {
    msg =
      msg ||
      `${getLocale('最多只能输入小数点后')} ${precision} ${getLocale('位')}`
  }
  return msg
}

const Keyboard = (props) => {
  const {
    defaultValue,
    onSubmit,
    children,
    min,
    max,
    precision,
    getErrorMsg,
    ...rest
  } = props

  // 输入值 及 输入校验提示信息
  const [currentValue, setCurrentValue] = useState(defaultValue)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    window.addEventListener('click', KeyboardStatics.isKeyboardNeedHide)
    return () => {
      window.removeEventListener('click', KeyboardStatics.isKeyboardNeedHide)
    }
  }, [])

  const handleSubmit = () => {
    // 没有更正输入
    if (errorMsg) {
      return
    }

    KeyboardStatics.hide()
    onSubmit(currentValue)
  }

  // 处理 小数点 情况
  const handelDot = (value) => {
    let v = value

    if (precision === 0) {
      Toast.tip({
        children: (
          <div className='m-number-keyboard-msg'>
            {getLocale('当前只能输入整数')}
          </div>
        ),
      })
      setErrorMsg(getLocale('当前只能输入整数'))
      return value
    }

    if (v === '') {
      // 为第一个, 在前面自动补充0
      v += '0.'
    } else {
      const dot = _.includes(v, '.') ? '' : '.'
      v += dot
    }
    return v
  }

  const handleMulZero = (value) => {
    const v = currentValue
    if (v === '0') {
      return value
    }
    return v + value
  }

  const handleClickNum = (value) => {
    let v = currentValue
    // 处理键盘点击相关，分三种type：back/回退, dot/小数点, number/数值
    switch (value.type) {
      case TYPE.BACK: {
        if (v !== '') {
          v = v.slice(0, -1)
        }
        break
      }
      case TYPE.DOT:
        v = handelDot(v)
        break
      case TYPE.NUMBER:
        // 连续点击多个 0 的情况
        v = handleMulZero(value.value)
        break
      default:
        break
    }

    return v
  }

  // 最大值，最小值限制以及精度判断
  const checkValue = (value) => {
    let cv = value
    if (cv === '') {
      return cv
    }

    // 注意当前输入为 . 的情况，此时判断小数点前数字
    if (cv[cv.length - 1] === '.') {
      cv = cv.slice(0, -1)
    }

    const msg = getErrorMsg({ value: cv, min, max, precision })
    setErrorMsg(msg)
    msg &&
      Toast.tip({
        children: <div className='m-number-keyboard-msg'>{msg}</div>,
      })
    return value + ''
  }

  const handleValueChange = (value) => {
    // 每次输入前清空上一次的提示信息
    setErrorMsg(null)

    // 处理键盘数字类型
    const v = handleClickNum(value)

    // 最大值，最小值限制以及精度判断
    const cv = checkValue(v)

    setCurrentValue(cv)
    onSubmit(cv)
  }

  return (
    <Flex column {...rest} className='m-number-keyboard'>
      <Flex className='m-number-keyboard-header'>
        <Flex alignCenter className='m-number-keyboard-header-input m-text-18'>
          {currentValue}
        </Flex>
        <Button
          type='primary'
          mini
          className='m-number-keyboard-header-btn'
          onClick={handleSubmit}
        >
          {getLocale('确定')}
        </Button>
      </Flex>
      {children}
      <BaseKeyboard onChange={handleValueChange} />
    </Flex>
  )
}

Object.assign(Keyboard, KeyboardStatics)

Keyboard.propTypes = {
  /** 初始默认值 */
  defaultValue: PropTypes.string,
  /** 确定回调函数 */
  onSubmit: PropTypes.func.isRequired,
  /** 最小值 */
  min: PropTypes.number,
  /** 最大值 */
  max: PropTypes.number,
  /** 精度, 可输入几位小数 */
  precision: PropTypes.number,
  /** 回调函数, 自定义不同情况下的错误提示信息, 参数为value, min, max, precision
   * 满足条件返回错误信息，string类型
   * 否则返回null
   */
  getErrorMsg: PropTypes.func,
}

Keyboard.defaultProps = {
  defaultValue: '',
  precision: 2,
  getErrorMsg: handleErrorMsg,
}

export default Keyboard
