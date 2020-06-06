import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import BaseCalendar from './base'
import { TYPE } from './util'

const RangeCalendar = forwardRef(({ begin, end, onSelect, ...rest }, ref) => {
  const refRangeCalendar = useRef(null)

  useImperativeHandle(ref, () => ({
    apiScrollToSelected: () => {
      refRangeCalendar.current.apiScrollToSelected()
    },
  }))

  const handleSelected = (selected) => {
    onSelect({ begin: selected[0], end: selected[1] })
  }

  return (
    <BaseCalendar
      ref={refRangeCalendar}
      {...rest}
      selected={[begin, end]}
      onSelect={handleSelected}
      type={TYPE.RANGE}
    />
  )
})

RangeCalendar.propTypes = {
  /** 开始日期 */
  begin: PropTypes.object,
  /** 结束日期 */
  end: PropTypes.object,
  /** 回调函数 */
  onSelect: PropTypes.func,
  /** 可选日期最小值 */
  min: PropTypes.object,
  /** 可选日期最大值 */
  max: PropTypes.object,
  /** 显示日期下方标签备注, 备注包括：单天，开始，结束 */
  showDateLabel: PropTypes.bool,
  /** 自定义不可选日期 */
  disabledDate: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default RangeCalendar
