import React, { Component } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import PickerColumn from './picker_column'
import { View } from '../../view'
import { Option, CouplingPickerState, CouplingPickerProps } from './types'

class CouplingPicker extends Component<
  CouplingPickerProps,
  CouplingPickerState
> {
  static defaultProps = {
    itemHeight: 40,
    renderOption: (dataIndex: number, option: Option) => option.text,
  }

  readonly state: CouplingPickerState = {
    selected: this.props.values,
  }

  private _handleChange = (index: number, option: Option) => {
    const { onChange } = this.props
    const { selected } = this.state
    const tempSelect = [...selected]
    tempSelect[index] = option ? option.value : ''
    // 前后一致这里setState也会触发更新，陷入死循环，故做层判断
    if (tempSelect.join() !== selected.join()) {
      this.setState({ selected: tempSelect })
      onChange(tempSelect)
    }
  }

  render() {
    const { selected } = this.state
    const {
      datas,
      values, // eslint-disable-line
      itemHeight = 40,
      onChange, // eslint-disable-line
      className,
      renderOption = (dataIndex: number, option: Option) => option.text,
      ...rest
    } = this.props

    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2),
    }

    const arr = []
    const subList: Option[][] = []
    for (let i = 0; i < selected.length; i++) {
      if (i === 0) {
        // i = 0遍历datas第一层
        arr[0] = _.map(datas, (v) => {
          if (v.value === selected[i]) {
            subList[0] = v.children || []
          }
          return {
            ...v,
            value: v.value,
            text: v.text,
          }
        })
      } else {
        // selected 的index >=1 的为datas第一层选择项的children
        arr[i] = _.map(subList[i - 1], (v) => {
          if (v.value === selected[i]) {
            subList[i] = v.children || []
          }
          return { ...v, value: v.value, text: v.text }
        })
      }
    }

    return (
      <View {...rest} className={classNames('m-picker', className)}>
        <View className='m-picker-inner' style={{ height: itemHeight * 6 }}>
          {_.map(arr, (v, i) => (
            <PickerColumn
              key={i}
              index={i}
              options={v}
              renderOption={renderOption}
              value={selected[i]}
              itemHeight={itemHeight}
              columnHeight={itemHeight * 6}
              onChange={this._handleChange}
            />
          ))}
          <View
            className='m-picker-highlight m-border-1px-top-before m-border-1px-bottom-after'
            style={highlightStyle}
          />
        </View>
      </View>
    )
  }
}

export default CouplingPicker
