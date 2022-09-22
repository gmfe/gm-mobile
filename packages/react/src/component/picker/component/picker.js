import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import PickerColumn from './picker_column'

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
    <div {...rest} className={classNames('m-picker', className)}>
      {headers && headers.length !== 0 && (
        <div className='m-picker-header'>
          {_.map(headers, (header) => (
            <div key={header} className='m-picker-header-item'>
              {header}
            </div>
          ))}
        </div>
      )}
      <div className='m-picker-inner' style={{ height: itemHeight * 6 }}>
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
        {/* <div
          className='m-picker-highlight m-border-1px-top-before m-border-1px-bottom-after'
          style={highlightStyle}
        /> */}
      </div>
    </div>
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
