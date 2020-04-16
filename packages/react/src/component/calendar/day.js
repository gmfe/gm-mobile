import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Flex from '../flex'

class Day extends React.Component {
  nowMountStart = +moment().startOf('day')
  handleClick = () => {
    const { onClick, value } = this.props
    onClick(value)
  }

  render() {
    const {
      currentMoment,
      value,
      begin,
      end,
      disabled,
      showDateLabel,
    } = this.props

    const wm = currentMoment.month()
    const vm = value.month()

    if (wm !== vm) {
      return <Flex className='m-calendar-day' />
    }

    const bv = begin && +moment(begin).startOf('day')
    const ev = end && +moment(end).startOf('day')
    const v = +value.startOf('day')

    const cn = classNames('m-calendar-day', {
      disabled: disabled,
      'm-calendar-day-begin': begin && v === bv,
      'm-calendar-day-end': end && v === ev,
      'm-calendar-day-selected': begin && end && v === bv && v === ev,
      'm-calendar-day-now': this.nowMountStart === +value.startOf('day'),
      active: begin && v > bv && v < ev,
    })

    // 判断当前渲染日期是否为所在月份的 第一天/最后一天
    const isDisabledGap = (type) => {
      const first = moment(value).startOf('month').date()
      const last = moment(value).endOf('month').date()
      const { locIndex } = this.props

      const day = type === 'left' ? first : last
      const mod = type === 'left' ? 0 : 6

      if (value.date() === day || locIndex % 7 === mod) {
        return true
      }
      return false
    }

    return (
      <Flex
        justifyCenter
        alignCenter
        onClick={disabled ? _.noop : this.handleClick}
        className={cn}
      >
        <span
          className={classNames('m-calendar-day-left', {
            disabled: isDisabledGap('left'),
          })}
        />
        <Flex column alignCenter justifyCenter className='m-calendar-day-text'>
          {value.date()}
          {showDateLabel && (
            <small>
              {v === bv && v === ev && getLocale('单天')}
              {v === bv && v !== ev && getLocale('开始')}
              {v !== bv && v === ev && getLocale('结束')}
            </small>
          )}
        </Flex>
        <span
          className={classNames('m-calendar-day-right', {
            disabled: isDisabledGap('right'),
          })}
        />
      </Flex>
    )
  }
}

Day.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.object,
  currentMoment: PropTypes.object,
  begin: PropTypes.object,
  end: PropTypes.object,
  disabled: PropTypes.bool,
  showDateLabel: PropTypes.bool,
  /** 当前渲染日期所在日历位置 */
  locIndex: PropTypes.number,
}

export default Day
