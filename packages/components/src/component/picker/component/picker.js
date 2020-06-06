import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _map from 'lodash/map'
import PickerColumn from './picker_column'
import View from '../../view'

const Picker = ({
  datas,
  values,
  itemHeight,
  onChange,
  className,
  renderOption,
  headers,
  ...rest
}) => {
  const handleChange = (index, option) => {
    const newValues = values.slice()

    newValues[index] = option.value

    onChange(newValues)
  }

  const highlightStyle = {
    height: itemHeight,
    marginTop: -(itemHeight / 2),
  }

  return (
    <View {...rest} className={classNames('m-picker', className)}>
      {headers && headers.length !== 0 && (
        <View className='m-picker-header'>
          {_map(headers, (header) => (
            <View key={header} className='m-picker-header-item'>
              {header}
            </View>
          ))}
        </View>
      )}
      <View className='m-picker-inner' style={{ height: itemHeight * 6 }}>
        {_map(datas, (v, i) => (
          <PickerColumn
            key={i}
            index={i}
            options={v}
            renderOption={renderOption}
            value={values[i]}
            itemHeight={itemHeight}
            columnHeight={itemHeight * 6}
            onChange={handleChange}
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

Picker.propTypes = {
  /** [ [{value, text}] ] */
  datas: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  /** 每列数据title, 格式为 [header, ...] */
  headers: PropTypes.array,
  itemHeight: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  renderOption: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Picker.defaultProps = {
  itemHeight: 40,
  renderOption: (dataIndex, option) => option.text, // 此 dataIndex 是 datas 的所以
}

export default Picker
