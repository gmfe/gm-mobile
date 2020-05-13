import React from 'react'
import PropTypes from 'prop-types'

import BaseCalendar from './base'
import { TYPE } from './util'

class Calendar extends React.Component {
  refCalendar = React.createRef()

  apiScrollToSelected = () => {
    this.refCalendar.current.apiScrollToSelected()
  }

  handleSelect = (selected) => {
    const { onSelect } = this.props
    onSelect(selected[0])
  }

  render() {
    const { selected, onSelect, ...rest } = this.props

    return (
      <BaseCalendar
        ref={this.refCalendar}
        {...rest}
        selected={[selected]}
        onSelect={this.handleSelect}
        type={TYPE.ONE}
      />
    )
  }
}

Calendar.propTypes = {
  /** 当前选中日期 */
  selected: PropTypes.object,
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

export default Calendar
