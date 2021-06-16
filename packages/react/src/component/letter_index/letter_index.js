import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import List from '../list'
import Letter from './letter'
import { Flex } from '@gm-mobile/c-react'
import { data2Group } from './util'

export const LetterIndex = ({
  selected,
  data,
  renderItem,
  onSelect,
  className,
  style,
  ...rest
}) => {
  const refList = useRef(null)

  const handleSelect = (selected) => {
    onSelect(selected)
  }

  const handleToLetter = (letter) => {
    refList.current.apiDoScrollToLabel(letter)
  }

  const gData = data2Group(data)
  return (
    <div
      {...rest}
      className={classNames('m-letter-index', className)}
      style={style}
    >
      <Flex column flex className='m-letter-index-content'>
        <List
          ref={refList}
          className='m-letter-index-list'
          data={gData}
          selected={selected}
          onSelect={handleSelect}
          renderItem={renderItem}
          isGroupList
        />
        <Letter onChange={handleToLetter} />
      </Flex>
    </div>
  )
}

LetterIndex.propTypes = {
  /** 数据格式：[{value, text}] */
  data: PropTypes.array.isRequired,
  /** 当前选择项 */
  selected: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  /** 自定义列表项 */
  renderItem: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

LetterIndex.defaultProps = {
  renderItem: (item) => item.text,
}

export default LetterIndex
