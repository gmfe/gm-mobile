import React from 'react'
import PropTypes from 'prop-types'
import List from '../list'
import Letter from './letter'
import { data2Group } from './util'
import classNames from 'classnames'

class LetterIndex extends React.Component {
  refList = React.createRef()

  handleSelect = (selected) => {
    this.props.onSelect(selected)
  }

  handleLetter = (letter) => {
    this.refList.current.apiDoScrollToLabel(letter)
  }

  render() {
    const {
      selected,
      data,
      renderItem,
      className,
      style,
      getFirstLetter,
      ...rest
    } = this.props
    const gData = data2Group(data, getFirstLetter)

    return (
      <div
        {...rest}
        className={classNames('m-bg-back m-letter-index', className)}
        style={style}
      >
        <List
          ref={this.refList}
          className='m-overflow-y m-relative m-letter-index-list'
          data={gData}
          selected={selected}
          onSelect={this.handleSelect}
          renderItem={renderItem}
          isGroupList
        />
        <Letter onChange={this.handleLetter} />
      </div>
    )
  }
}

LetterIndex.propTypes = {
  /** 数据格式：[{value, text}] */
  data: PropTypes.array.isRequired,
  /** 当前选择项 */
  selected: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
  /** 传入获取首拼的函数 */
  getFirstLetter: PropTypes.func.isRequired,
  /** 自定义列表项 */
  renderItem: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

LetterIndex.defaultProps = {
  renderItem: (item) => item.text,
}

export default LetterIndex
