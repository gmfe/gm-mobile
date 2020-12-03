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
    selected[index] = option ? option.value : ''

    this.setState({ selected })
    onChange(selected)
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
    let subList1: Option[] = []
    let subList2: Option[] = []
    for (let i = 0; i < selected.length; i++) {
      if (i === 0) {
        arr[0] = _.map(datas, (v) => {
          if (v.value === selected[i]) {
            subList1 = v.children || []
          }
          return {
            ...v,
            value: v.value,
            text: v.text,
          }
        })
      } else if (i === 1) {
        arr[1] = _.map(subList1, (v) => {
          if (v.value === selected[i]) {
            subList2 = v.children || []
          }
          return {
            ...v,
            value: v.value,
            text: v.text,
          }
        })
      } else {
        arr[i] = _.map(subList2, (v) => {
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
