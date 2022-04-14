import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Base from './base'

const List = forwardRef(
  ({ data, selected, multiple, isGroupList, onSelect,renderItem, ...rest }, ref) => {
    const refList = useRef(null)

    useImperativeHandle(ref, () => ({
      apiDoScrollToLabel: (label) => {
        refList.current.apiDoScrollToLabel(label)
      },
      apiDoScrollToValue: (value) => {
        refList.current.apiDoScrollToValue(value)
      },
    }))

    const handleSelected = (selected) => {
      if (multiple) {
        onSelect(selected)
      } else {
        onSelect(selected[0])
      }
    }

    let oData = null
    if (isGroupList) {
      oData = data
    } else {
      oData = [
        {
          label: '',
          id: '',
          children: data,
        },
      ]
    }

    let oSelected = null
    if (multiple) {
      oSelected = selected || []
    } else {
      oSelected = selected ? [selected] : []
    }

    return (
      <Base
        {...rest}
        ref={refList}
        data={oData}
        selected={oSelected}
        onSelect={handleSelected}
        multiple={multiple}
        isGroupList={isGroupList}
        renderItem={renderItem}
      />
    )
  }
)

List.propTypes = {
  ...Base.propTypes,

  /**
   * [{value, text, disabled}]
   * group [{label, id, children: [{value, text, disabled}]}]
   * */
  data: PropTypes.array.isRequired,
  /** 单选 value，多选 [value, value]。多选提供数组 */
  selected: PropTypes.any,
  /** 单选 value，多选 [value, value] */
  onSelect: PropTypes.func,
}

export default List
