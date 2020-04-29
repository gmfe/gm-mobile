import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import _ from 'lodash'

import Head from './head'
import Day from './day'
import Week from './week'
import Flex from '../flex'
import { TYPE } from './util'

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelectBegin: true,
    }
  }

  /** 暴露给外部使用 */
  apiScrollToSelected = () => {
    const { type } = this.props
    const selector =
      type === TYPE.RANGE ? '.m-calendar-day-begin' : '.m-calendar-day-selected'
    const $dom = findDOMNode(this.refCalendar).querySelector(selector)
    if ($dom) {
      $dom.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      })
    }
  }

  // 多个日期选择
  handleSelectMulDay = (m) => {
    const { selected } = this.props
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
    this.props.onSelect(_selected)
  }

  handleSelectDay = (m) => {
    const { isSelectBegin } = this.state
    const { selected, type } = this.props

    // 日期段选择
    if (type === TYPE.RANGE) {
      let sb = selected[0]
      let se = selected[1]

      // 一开始选择 开始时间
      if (isSelectBegin) {
        sb = m.toDate()
        se = m.toDate()

        this.setState({
          isSelectBegin: false,
        })
      } else {
        if (+m < +sb) {
          se = sb
          sb = m.toDate()
          this.setState({
            isSelectBegin: true,
          })
        } else {
          se = m.toDate()
          this.setState({
            isSelectBegin: true,
          })
        }
      }

      this.props.onSelect([sb, se])
      return
    }

    if (type === TYPE.MULTIPLE) {
      this.handleSelectMulDay(m)
      return
    }

    this.props.onSelect(m.toDate())
  }

  getDisabled(m) {
    let { min, max, disabledDate } = this.props
    // disabledDate 优先
    if (disabledDate) {
      return disabledDate(m)
    }

    min = min ? moment(min).startOf('day') : null
    max = max ? moment(max).startOf('day') : null

    let disabled = false

    if (min && m < min) {
      disabled = true
    }
    if (max && m > max) {
      disabled = true
    }

    return disabled
  }

  computedMonthList() {
    const { min, max, selected, type } = this.props
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

  getDayRowOfMonth(currentMoment) {
    if (
      moment(currentMoment).day(0).add(35, 'day').month() !==
      currentMoment.month()
    ) {
      return _.groupBy(_.range(35), (v) => parseInt(v / 7))
    }
    return _.groupBy(_.range(42), (v) => parseInt(v / 7))
  }

  render() {
    const { showDateLabel, className, selected, type, ...rest } = this.props

    return (
      <Flex
        ref={(ref) => (this.refCalendar = ref)}
        column
        {...rest}
        className={classNames('m-calendar', className)}
      >
        <Week />
        <Flex column className='m-calendar-content m-padding-bottom-10'>
          {_.map(this.computedMonthList(), (currentMoment, cmi) => {
            const m = moment(currentMoment).day(0).add(-1, 'day')
            const dayGroup = this.getDayRowOfMonth(currentMoment)

            return (
              <Flex
                column
                key={cmi}
                className={classNames({ 'm-margin-top-10': cmi !== 0 })}
              >
                <Head currentMoment={currentMoment} />
                {_.map(dayGroup, (v, i) => (
                  <Flex key={i} className='m-padding-top-10'>
                    {_.map(v, (value, index) => {
                      const mm = moment(m.add(1, 'day'))

                      return (
                        <Day
                          key={value}
                          selected={selected}
                          type={type}
                          currentMoment={currentMoment}
                          value={mm}
                          locIndex={index}
                          onClick={this.handleSelectDay}
                          disabled={this.getDisabled(mm)}
                          showDateLabel={showDateLabel}
                        />
                      )
                    })}
                  </Flex>
                ))}
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    )
  }
}

Calendar.propTypes = {
  /** 选择日期, 单选传date, 其它传date数组 */
  selected: PropTypes.any,
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

Calendar.defaultProps = {
  onSelect: _.noop,
}

export default Calendar
