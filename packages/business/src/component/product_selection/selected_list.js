import { getLocale } from '@gm-mobile/locales'
import React, { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Flex, Mask } from '@gm-mobile/react'

const SelectedList = ({ list, onSelect, onClose, ...rest }) => {
  const [selectedList, setSelectedList] = useState(list)

  const handleDelete = (item) => {
    // 原选择 value 数组
    const data = _.map(selectedList, (item) => item.value)
    // 当前选择 value 数组
    const selected = _.xor(data, [item.value])
    // 处理数据
    const _selectedList = _.filter(
      list,
      (v) => _.findIndex(selected, (s) => s === v.value) !== -1
    )
    setSelectedList(_selectedList)
    onSelect(selected)
  }

  return (
    <div className='m-selected-list'>
      <Mask onClick={onClose} />
      <div className='m-selected-list-content m-animated m-animated-slide-in-bottom'>
        <Flex alignCenter className='m-selected-list-content-title'>
          {getLocale('已选商品')}（{selectedList.length}）
          <Flex
            justifyCenter
            alignCenter
            className='m-selected-list-content-icon m-text-placeholder'
            onClick={onClose}
          >
            <i className='m-font m-font-close-circle' />
          </Flex>
        </Flex>
        {_.map(selectedList, (item) => (
          <Flex
            alignCenter
            className='m-selected-list-content-item'
            key={item.value}
          >
            {item.text}
            <Flex
              justifyCenter
              alignCenter
              className='m-selected-list-content-icon'
              onClick={() => handleDelete(item)}
            >
              <i className='m-font m-font-delete' />
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  )
}

SelectedList.propTypes = {
  list: PropTypes.array,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
}

export default SelectedList
