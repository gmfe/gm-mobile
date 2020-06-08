import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Letter from './letter'
import List from '../list'
import { Flex } from '@gm-mobile/components'
import { data2Group } from './util'

const LetterIndexMultiple = ({
  data,
  renderItem,
  selected,
  onSelect,
  className,
  style,
  ...rest
}) => {
  const refList = useRef(null)

  const handleToLetter = (letter) => {
    refList.current.apiDoScrollToLabel(letter)
  }

  const gData = data2Group(data)

  return (
    <div
      {...rest}
      className={classNames('m-letter-index-multiple', className)}
      style={style}
    >
      <Flex column flex className='m-letter-index-multiple-content'>
        <List
          ref={refList}
          className='m-letter-index-multiple-list'
          data={gData}
          selected={selected}
          onSelect={onSelect}
          renderItem={renderItem}
          multiple
          isGroupList
        />
        <Letter onChange={handleToLetter} />
      </Flex>
    </div>
  )
}

LetterIndexMultiple.propTypes = {
  /** 数据格式：[{value, text}] */
  data: PropTypes.array.isRequired,
  /** 当前选择项数组 */
  selected: PropTypes.array,
  /** 选择回调函数 */
  onSelect: PropTypes.func.isRequired,
  /** 自定义列表项 */
  renderItem: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

LetterIndexMultiple.defaultProps = {
  renderItem: (item) => item.text,
}

export default LetterIndexMultiple
