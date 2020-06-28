import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'

import Week from './week'
import Month from './month'
import { TYPE } from './util'
import View from '../view'
import ScrollIntoView from '../scroll_into_view'

const BaseCalendar = (props) => {
  const [isSelectBegin, setIsSelectBegin] = useState(true)
  const [targetId, setTargetId] = useState('')

  const {
    type,
    selected,
    onSelect,
    min,
    max,
    disabledDate,
    showDateLabel,
    className,
    style,
    ...rest
  } = props

  useEffect(() => {
    if (selected && selected.length) {
      const date = type === TYPE.RANGE ? selected[1] : selected[0]
      const id = `m-calendar-${moment(date).format('YYYY-MM-DD')}`
      setTargetId(id)
    }
  }, [])

  // 多个日期选择
  const handleSelectMulDay = (m) => {
    let _selected = selected.slice()
    // 点击相同日期，取消该日期选择
    const dayIndex = _.findIndex(
      _selected,
      (date) => +moment(date).startOf('day') === +moment(m).startOf('day')
    )

    if (dayIndex !== -1) {
      _selected.splice(dayIndex, 1)
    } else {
      _selected = _selected.concat([m.toDate()])
    }
    onSelect(_selected)
  }

  const handleSelectDay = (m) => {
    // 日期段选择
    if (type === TYPE.RANGE) {
      let sb = selected[0]
      let se = selected[1]

      // 一开始选择 开始时间
      if (isSelectBegin) {
        sb = m.toDate()
        se = m.toDate()

        setIsSelectBegin(false)
      } else {
        if (+m < +sb) {
          se = sb
          sb = m.toDate()
          setIsSelectBegin(true)
        } else {
          se = m.toDate()
          setIsSelectBegin(true)
        }
      }

      onSelect([sb, se])
      return
    }

    if (type === TYPE.MULTIPLE) {
      handleSelectMulDay(m)
      return
    }

    onSelect([m.toDate()])
  }

  const getDisabled = (m) => {
    let _min = min
    let _max = max
    // disabledDate 优先
    if (disabledDate) {
      return disabledDate(m)
    }

    _min = min ? moment(min).startOf('day') : null
    _max = max ? moment(max).startOf('day') : null

    let disabled = false

    if (_min && m < _min) {
      disabled = true
    }
    if (_max && m > _max) {
      disabled = true
    }

    return disabled
  }

  const computedMonthList = () => {
    // 优先 min，其次 begin ，其次 当前
    let mMin = null
    let mMax = null

    if (type === TYPE.RANGE) {
      const _min = min || selected[0]
      const _max = max || selected[1]

      mMin = (_min ? moment(_min) : moment()).startOf('month')
      mMax = (_max ? moment(_max) : moment()).startOf('month')
    } else {
      mMin = moment(min).startOf('month')
      mMax = moment(max).startOf('month')
    }

    const arr = []

    // eslint-disable-next-line
    while (mMin <= mMax) {
      arr.push(moment(mMin))
      mMin.add(1, 'month')
    }

    return arr
  }

  return (
    <View {...rest} className={classNames('m-calendar', className)}>
      <Week />
      <ScrollIntoView className='m-calendar-content' targetId={targetId}>
        {_.map(computedMonthList(), (currentMoment, cmi) => {
          return (
            <Month
              key={cmi}
              index={cmi}
              currentMoment={currentMoment}
              selected={selected}
              type={type}
              onSelectDay={handleSelectDay}
              getDisabled={getDisabled}
              showDateLabel={showDateLabel}
            />
          )
        })}
      </ScrollIntoView>
    </View>
  )
}

BaseCalendar.propTypes = {
  /** 选择日期数组 */
  selected: PropTypes.array,
  /** 选择日期类型：one，range，multiple -- 单选，日期段，多个日期 */
  type: PropTypes.oneOf(['one', 'range', 'multiple']),
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

BaseCalendar.defaultProps = {
  onSelect: _.noop,
}

export default BaseCalendar
