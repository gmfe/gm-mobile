import React from 'react'
import PropTypes from 'prop-types'

import BaseCalendar from './base'
import { TYPE } from './util'

class MultipleCalendar extends React.Component {
  refMultipleCalendar = React.createRef()

  apiScrollToSelected = () => {
    this.refMultipleCalendar.current.apiScrollToSelected()
  }

  render() {
    return (
      <BaseCalendar
        ref={this.refMultipleCalendar}
        {...this.props}
        type={TYPE.MULTIPLE}
      />
    )
  }
}

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
