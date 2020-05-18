import { getLocale } from '@gm-mobile/locales'
import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Badge } from '@gm-mobile/react'
import _ from 'lodash'

import SVGCart from '../../../svg/cart.svg'

const Bottom = ({ selected, onSelectedShow, onConfirm }) => {
  const disabled = selected.length === 0
  return (
    <Flex
      className={classNames('m-letter-multiple-list-bottom', {
        disabled,
      })}
    >
      <Flex alignCenter className='m-letter-multiple-list-bottom-content'>
        <Badge
          corner
          count={selected.length}
          className='m-letter-multiple-list-bottom-badge'
        />
        <span
          className='m-letter-multiple-list-bottom-icon'
          onClick={disabled ? _.noop : onSelectedShow}
        >
          <SVGCart />
        </span>
        {getLocale('共选择')}
        {selected.length}
        {getLocale('个商品')}
      </Flex>
      <Flex
        justifyCenter
        alignCenter
        onClick={disabled ? _.noop : onConfirm}
        className='m-letter-multiple-list-bottom-btn'
      >
        {getLocale('确定添加')}
      </Flex>
    </Flex>
  )
}

Bottom.propTypes = {
  selected: PropTypes.array,
  onSelectedShow: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default Bottom
