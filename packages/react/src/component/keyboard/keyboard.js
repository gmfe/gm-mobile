import { getLocale } from '@gm-mobile/locales'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import BaseKeybaord from './_keyboard'
import Flex from '../flex'
import Button from '../button'
import { TYPE, text2Number, processValue, MSGTYPE } from './util'
import KeyboardStatics from './statics'

const Keyboard = (props) => {
  const { title, defaultValue, onSubmit, children, precision, ...rest } = props

  const _value = processValue(defaultValue)
  // 输入值 及 输入校验提示信息
  const [currentValue, setCurrentValue] = useState(_value)
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSubmit = () => {
    // 没有更正输入
    if (errorMsg && errorMsg.type !== MSGTYPE.PRECISION) {
      return
    }

    // 转成number给业务方
    const num = text2Number(currentValue)
    KeyboardStatics.hide()
    onSubmit(num)
  }

  // 处理 小数点 情况
  const handelDot = (value) => {
    let v = value

    if (precision === 0) {
      setErrorMsg({
        type: MSGTYPE.PRECISION,
        text: getLocale(`当前只能输入整数`),
      })
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

    const { min, max, precision } = props
    // 注意当前输入为 . 的情况，此时只需判断 . 之前的数字，否则直接判断
    if (cv[cv.length - 1] === '.') {
      cv = cv.slice(0, -1)
    }

    let msg = null
    if (min && max) {
      msg = getLocale(`请输入大于 ${min} 小于 ${max} 的数！`)
    }

    cv = text2Number(cv)
    if (max && cv > max) {
      setErrorMsg({
        type: MSGTYPE.MAX,
        text: msg || getLocale(`请输入小于 ${max} 的数！`),
      })
      return cv + ''
    } else if (min && cv < min) {
      setErrorMsg({
        type: MSGTYPE.MIN,
        text: msg || getLocale(`请输入大于 ${min} 的数！`),
      })
      return cv + ''
    }

    // 精度校验
    const num = value.split('.')
    if (num.length > 1 && num[1].length > precision) {
      // 超出精度，直接处理截断
      setErrorMsg({
        type: MSGTYPE.PRECISION,
        text: getLocale(`最多只能输入小数点后${precision}位！`),
      })
      return value.slice(0, value.length - (num[1].length - precision))
    }

    return value
  }

  const handleValueChange = (value) => {
    // 每次输入前清空上一次的提示信息
    setErrorMsg('')

    // 处理键盘数字类型
    const v = handleClickNum(value)

    // 最大值，最小值限制以及精度判断
    const cv = checkValue(v)

    setCurrentValue(cv)
  }

  return (
    <Flex column {...rest} className='m-number-keyboard'>
      {title && <Flex className='m-number-keyboard-title'>{title}</Flex>}
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
      <Flex className='m-number-keyboard-error'>
        {errorMsg && errorMsg.text}
      </Flex>
      {children}
      <BaseKeybaord onChange={handleValueChange} />
    </Flex>
  )
}

Object.assign(Keyboard, KeyboardStatics)

Keyboard.propTypes = {
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
}

Keyboard.defaultProps = {
  defaultValue: null,
  precision: 2,
}

export default Keyboard
