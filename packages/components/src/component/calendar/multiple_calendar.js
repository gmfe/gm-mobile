import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import BaseCalendar from './base'
import { TYPE } from './util'

const MultipleCalendar = forwardRef((props, ref) => {
  const refMultipleCalendar = useRef(null)

  useImperativeHandle(ref, () => ({
    apiScrollToSelected: () => {
      refMultipleCalendar.current.apiScrollToSelected()
    },
  }))

  return (
    <BaseCalendar ref={refMultipleCalendar} {...props} type={TYPE.MULTIPLE} />
  )
})

MultipleCalendar.propTypes = {
  /** 当前选中日期数组 */
  selected: PropTypes.array.isRequired,
  /** 回调函数 */
  onSelect: PropTypes.func,
  /** 可选日期最小值 */
  min: PropTypes.object,
  /** 可选日期最大值 */
  max: PropTypes.object,
  /** 自定义不可选日期 */
  disabledDate: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default MultipleCalendar
