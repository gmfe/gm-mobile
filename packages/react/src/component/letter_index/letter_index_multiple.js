import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import List from '../list'
import Letter from './letter'
import Flex from '../flex'
import { data2Group } from './util'
import classNames from 'classnames'

class LetterIndexMultiple extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected || [],
    }
  }

  refList = React.createRef()

  handleSelect = (selected) => {
    this.setState({
      selected,
    })
  }

  handleLetter = (letter) => {
    console.log(111, letter)
    this.refList.current.apiDoScrollToLabel(letter)
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  handleConfirm = () => {
    this.props.onSelect(this.state.selected)
  }

  render() {
    const {
      data,
      renderItem,
      selected,
      onSelect,
      onCancel,
      className,
      style,
      getFirstLetter,
      ...rest
    } = this.props

    const gData = data2Group(data, getFirstLetter)

    return (
      <Flex
        {...rest}
        column
        className={classNames('m-bg-back m-letter-index-multiple', className)}
        style={style}
      >
        <Flex column flex className='m-relative' style={{ height: '100%' }}>
          <List
            ref={this.refList}
            className='m-overflow-y m-relative m-letter-index-multiple-list'
            data={gData}
            selected={this.state.selected}
            onSelect={this.handleSelect}
            renderItem={renderItem}
            multiple
            isGroupList
          />
          <Letter onChange={this.handleLetter} />
        </Flex>
        <Flex className='m-bg-white m-letter-index-multiple-gap'>
          <Flex
            flex
            justifyCenter
            alignCenter
            onClick={this.handleCancel}
            className='m-border-1px-top-before m-border-1px-right-after'
          >
            {getLocale('取消')}
          </Flex>
          <Flex
            flex
            justifyCenter
            alignCenter
            onClick={this.handleConfirm}
            className='m-border-1px-top-before m-bg-primary m-text-white'
          >
            {getLocale('确定')}
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

LetterIndexMultiple.propTypes = {
  /** 数据格式：[{value, text}] */
  data: PropTypes.array.isRequired,
  /** 当前选择项 */
  selected: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  /** 传入获取首拼的函数 */
  getFirstLetter: PropTypes.func.isRequired,
  /** 自定义列表项 */
  renderItem: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

LetterIndexMultiple.defaultProps = {
  renderItem: (item) => item.text,
}

export default LetterIndexMultiple
