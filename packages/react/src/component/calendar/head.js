import { getLocale } from '../../../../locales'
import React from 'react'
import PropTypes from 'prop-types'

import Flex from '../flex'

const months = [
  getLocale('1月'),
  getLocale('2月'),
  getLocale('3月'),
  getLocale('4月'),
  getLocale('5月'),
  getLocale('6月'),
  getLocale('7月'),
  getLocale('8月'),
  getLocale('9月'),
  getLocale('10月'),
  getLocale('11月'),
  getLocale('12月'),
]

const Head = (props) => {
  const { currentMoment } = props
  const month = currentMoment.month()

  return (
    <Flex className='clearfix m-bg-back m-padding-left-20'>
      <Flex
        flex
        className='m-text-16 m-text-bold m-padding-tb-5 m-padding-left-20'
      >
        <span>
          {currentMoment.year()}
          {getLocale('年')}
        </span>
        <span>{months[month]}</span>
      </Flex>
    </Flex>
  )
}

Head.propTypes = {
  currentMoment: PropTypes.object,
}

export default Head
