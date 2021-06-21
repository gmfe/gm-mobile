import React, { FC } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import PickerColumn from './picker_column'
import { View } from '../../view'
import { Option, PickerProps } from './types'

export const Picker: FC<PickerProps> = ({
  datas,
  values,
  itemHeight = 40,
  onChange,
  className,
  renderOption = (dataIndex: number, option: Option) => option.text,
  headers,
  ...rest
}) => {
  const handleChange = (index: number, option: Option) => {
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
          {_.map(headers, (header) => (
            <View key={header} className='m-picker-header-item'>
              {header}
            </View>
          ))}
        </View>
      )}
      <View className='m-picker-inner' style={{ height: itemHeight * 6 }}>
        {_.map(datas, (v, i) => (
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

export default Picker
