import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './calendar'
import { TYPE } from './util'

class RangeCalendar extends React.Component {
  refRangeCalendar = React.createRef()

  handleSelected = (selected) => {
    const { onSelect } = this.props
    onSelect({ begin: selected[0], end: selected[1] })
  }

  render() {
    const { begin, end, onSelect, ...rest } = this.props

    return (
      <Calendar
        ref={this.refRangeCalendar}
        {...rest}
        selected={[begin, end]}
        onSelect={this.handleSelected}
        type={TYPE.RANGE}
      />
    )
  }
}

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
  /** 显示日期下方标签备注, 备注包括：单天，开始，结束, 一般配合 日期段选择 使用 */
  showDateLabel: PropTypes.bool,
  /** 自定义不可选日期 */
  disabledDate: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default RangeCalendar
