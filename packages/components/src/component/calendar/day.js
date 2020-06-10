import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import find from 'lodash/find'
import noop from 'lodash/noop'

import Flex from '../flex'
import Text from '../text'
import { TYPE } from './util'

const Day = ({
  onClick,
  value,
  selected,
  type,
  currentMoment,
  disabled,
  showDateLabel,
  locIndex,
}) => {
  const nowMountStart = +moment().startOf('day')

  const handleClick = () => {
    onClick(value)
  }

  // 判断当前渲染日期是否为所在月份的 第一天/最后一天
  const isSelectedDayGap = (type) => {
    const first = moment(value).startOf('month').date()
    const last = moment(value).endOf('month').date()

    const day = type === 'left' ? first : last
    const mod = type === 'left' ? 0 : 6

    if (value.date() === day || locIndex % 7 === mod) {
      return true
    }
    return false
  }

  const isSelectedDate = () => {
    const v = +value.startOf('day')

    if (type === TYPE.RANGE) {
      return (
        v === +moment(selected[0]).startOf('day') &&
        v === +moment(selected[1]).startOf('day')
      )
    }

    let s = null
    if (type === TYPE.MULTIPLE) {
      s = find(selected, (date) => +moment(date).startOf('day') === v)
    } else {
      // 单选直接判断
      s = +moment(selected[0]).startOf('day') === v
    }

    if (s) {
      return true
    }
    return false
  }

  const wm = currentMoment.month()
  const vm = value.month()

  if (wm !== vm) {
    return <Flex className='m-calendar-day' />
  }

  let bv = null
  let ev = null
  if (type === TYPE.RANGE) {
    bv = selected[0] && +moment(selected[0]).startOf('day')
    ev = selected[1] && +moment(selected[1]).startOf('day')
  }
  const v = +value.startOf('day')

  const cn = classNames('m-calendar-day', {
    // 无状态
    'm-calendar-day-now': nowMountStart === +value.startOf('day'),
    // 不可用
    disabled: disabled,
    // 单个选中态
    'm-calendar-day-selected': isSelectedDate(),
    // 日期段选中态
    'm-calendar-day-begin': type === TYPE.RANGE && selected[0] && v === bv,
    'm-calendar-day-end': type === TYPE.RANGE && selected[1] && v === ev,
    active: type === TYPE.RANGE && selected[0] && v > bv && v < ev,
  })

  return (
    <Flex
      justifyCenter
      alignCenter
      onClick={disabled ? noop : handleClick}
      className={cn}
    >
      <Text
        className={classNames('m-calendar-day-left', {
          'm-calendar-day-left-first': isSelectedDayGap('left'),
        })}
      />
      <Flex column alignCenter justifyCenter className='m-calendar-day-text'>
        {value.date()}
        {showDateLabel && type === TYPE.RANGE && (
          <Text className='m-calendar-day-label'>
            {v === bv && v === ev && getLocale('单天')}
            {v === bv && v !== ev && getLocale('开始')}
            {v !== bv && v === ev && getLocale('结束')}
          </Text>
        )}
      </Flex>
      <Text
        className={classNames('m-calendar-day-right', {
          'm-calendar-day-right-last': isSelectedDayGap('right'),
        })}
      />
    </Flex>
  )
}

Day.propTypes = {
  selected: PropTypes.array,
  /** 选择日期类型：one，range，multiple */
  type: PropTypes.oneOf(['one', 'range', 'multiple']),

  onClick: PropTypes.func,
  value: PropTypes.object,
  currentMoment: PropTypes.object,
  disabled: PropTypes.bool,
  showDateLabel: PropTypes.bool,
  /** 当前渲染日期所在日历位置 */
  locIndex: PropTypes.number,
}

export default Day
