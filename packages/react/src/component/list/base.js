import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

import { Checkbox, Radio } from '@gm-mobile/components'

// 不要轻易改这个文件
class Base extends React.Component {
  refList = React.createRef()
  _isMounted = false

  apiDoScrollToLabel = (label) => {
    // 找第一个即可
    if (!this._isMounted) {
      const $dom = this.refList.current.querySelector(`[data-label="${label}"]`)
      if ($dom) {
        $dom.scrollIntoViewIfNeeded()
      }
    }
  }

  apiDoScrollToValue = (value) => {
    // 找第一个即可
    if (!this._isMounted) {
      const $dom = this.refList.current.querySelector(`[data-value="${value}"]`)
      if ($dom) {
        $dom.scrollIntoViewIfNeeded()
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = true
  }

  handleSelect = (item) => {
    if (item.disabled) {
      return
    }

    const { multiple, selected, onSelect } = this.props
    if (multiple) {
      onSelect(_.xor(selected, [item.value]))
    } else {
      onSelect([item.value])
    }
  }

  render() {
    const {
      data,
      isGroupList,
      selected,
      multiple,
      onSelect,
      renderItem,
      className,
      ...rest
    } = this.props

    return (
      <div
        {...rest}
        ref={this.refList}
        className={classNames(
          'm-list',
          { 'm-list-group': isGroupList },
          className
        )}
      >
        {_.map(data, (group) => (
          <div
            key={group.label}
            data-label={group.label}
            className='m-list-group-item'
          >
            <div className='m-list-label'>{group.label}</div>
            {_.map(group.children, (item) => (
              <div
                key={item.value}
                data-value={item.value}
                className={classNames('m-list-item', {
                  active: selected.includes(item.value),
                  disabled: item.disabled,
                })}
              >
                {multiple && (
                  <Checkbox
                    circle
                    primary
                    checked={selected.includes(item.value)}
                    disabled={item.disabled}
                    onChange={this.handleSelect.bind(this, item)}
                    className='m-padding-tb-10 m-padding-left-15'
                  />
                )}
                <div
                  className={classNames('m-list-item-text', {
                    'm-padding-left-15': !multiple,
                  })}
                  onClick={this.handleSelect.bind(this, item)}
                >
                  {renderItem(item)}
                  {!multiple && (
                    <Radio
                      checked={selected.includes(item.value)}
                      disabled={item.disabled}
                      onChange={this.handleSelect.bind(this, item)}
                      className='m-list-item-radio'
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

Base.propTypes = {
  /** 基本属性，数据格式为[{label, id, children: [{ value text}, ...]}, ...] */
  data: PropTypes.array.isRequired,
  /** 选择项 */
  selected: PropTypes.array.isRequired,
  /** 选择回调, 返回数组类型 */
  onSelect: PropTypes.func,
  /** 是否多选 */
  multiple: PropTypes.bool,
  /** 自定义列表项展示 */
  renderItem: PropTypes.func,
  isGroupList: PropTypes.bool, // 在这里仅仅表示数据的类型，对UI有影响而已

  className: PropTypes.string,
  style: PropTypes.object,
}

Base.defaultProps = {
  multiple: false,
  onSelect: _.noop,
  renderItem: (item) => item.text,
}

export default Base
