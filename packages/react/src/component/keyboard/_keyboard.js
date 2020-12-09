import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Flex } from '@gm-mobile/c-react'
import { TYPE, KEYS } from './util'

const BaseKeyboard = (props) => {
  const { onChange } = props

  const handleKeyClick = (key) => {
    onChange(key)
  }

  return (
    <Flex wrap className='m-keyboard'>
      {_.map(KEYS, (k, index) => (
        <Flex key={k.value} className='m-keyboard-num'>
          {index % 3 === 0 && <div className='m-keyboard-gap' />}
          <Flex
            justifyCenter
            alignCenter
            className='m-keyboard-text'
            onClick={() => handleKeyClick(k)}
          >
            {k.value}
          </Flex>
          <div className='m-keyboard-gap' />
        </Flex>
      ))}
      <Flex className='m-keyboard-num'>
        <Flex
          justifyCenter
          alignCenter
          className='m-keyboard-text'
          onClick={() => handleKeyClick({ type: TYPE.BACK, value: null })}
        >
          <i className='m-font m-font-keyboard_del m-keyboard-del-icon' />
        </Flex>
        <div className='m-keyboard-gap' />
      </Flex>
    </Flex>
  )
}

BaseKeyboard.propTypes = {
  /** 键盘点击回调, 参数为object, { type, value } */
  onChange: PropTypes.func.isRequired,
}

export default BaseKeyboard
