import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import PickerColumn from './picker_column'
import { View } from '../../view'

class CouplingPicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.values,
    }
  }

  handleChange = (index, option) => {
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
      itemHeight,
      onChange, // eslint-disable-line
      className,
      renderOption,
      ...rest
    } = this.props

    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2),
    }

    const arr = []
    let subList1 = []
    let subList2 = []
    for (let i = 0; i < selected.length; i++) {
      if (i === 0) {
        arr[0] = _.map(datas, (v) => {
          if (v.value === selected[i]) {
            subList1 = v.children
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
            subList2 = v.children
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
              onChange={this.handleChange}
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

CouplingPicker.propTypes = {
  /** [{value, text, children: [{value, text, children: [{value, text, children: []}]}]}] */
  datas: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  itemHeight: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  /** 此 dataIndex 是 datas 的所以 */
  renderOption: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

CouplingPicker.defaultProps = {
  itemHeight: 40,
  renderOption: (dataIndex, option) => option.text,
}

export default CouplingPicker
