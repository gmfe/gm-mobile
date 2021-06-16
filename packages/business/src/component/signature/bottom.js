import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import { Flex, Button } from '@gm-mobile/react'
import PropTypes from 'prop-types'
import _ from 'lodash'

export const Bottom = ({ isEdit, onReset, onSubmit }) => {
  return (
    <Flex
      column
      id='signature-bottom'
      className='m-padding-10 m-border-1px-top-before'
    >
      <Flex alignCenter justifyCenter flex>
        <Button block type='primary' onClick={onSubmit}>
          {isEdit ? getLocale('确定签收') : getLocale('保存')}
        </Button>
      </Flex>
      <Flex
        alignCenter
        justifyCenter
        flex
        className='m-border-1px-right-before'
      >
        <Button block plain className='m-margin-top-10' onClick={onReset}>
          {getLocale('重置')}
        </Button>
      </Flex>
    </Flex>
  )
}

Bottom.propTypes = {
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  isEdit: PropTypes.bool,
}

Bottom.defaultProps = {
  onReset: _.noop,
  onSubmit: _.noop,
}

export default Bottom
