import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Flex from '../flex'
import SVGDel from '../../../svg/keyboard_del.svg'
import { TYPE, KEYS } from './util'

const Keyboard = (props) => {
  const { onChange } = props

  const handleKeyClick = (key) => {
    onChange(key)
  }

  return (
    <Flex wrap className='m-keyboard'>
      {_.map(KEYS, (k, index) => (
        <Flex key={k.value} className='m-keyboard-num'>
          {index % 3 === 0 && <div className='m-gap-15' />}
          <Flex
            justifyCenter
            alignCenter
            className='m-keyboard-text'
            onClick={() => handleKeyClick(k)}
          >
            {k.value}
          </Flex>
          <div className='m-gap-15' />
        </Flex>
      ))}
      <Flex className='m-keyboard-num'>
        <Flex
          justifyCenter
          alignCenter
          className='m-keyboard-text'
          onClick={() => handleKeyClick({ type: TYPE.BACK, value: null })}
        >
          <SVGDel className='m-keyboard-del-icon' />
        </Flex>
        <div className='m-gap-15' />
      </Flex>
    </Flex>
  )
}

Keyboard.propTypes = {
  /** 键盘点击回调, 参数为object, { type, value } */
  onChange: PropTypes.func.isRequired,
}

export default Keyboard
