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

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelectBegin: true,
    }
  }

  /** 暴露给外部使用 */
  apiScrollToBegin = () => {
    const $dom = findDOMNode(this.refCalendar).querySelector(
      '.m-calendar-day-point'
    )
    if ($dom) {
      $dom.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
      })
    }
  }

  handleSelectDay = (m) => {
    const { begin, end } = this.props
    const { isSelectBegin } = this.state

    let sb = begin
    let se = end

    // 一开始选择 开始时间
    if (isSelectBegin) {
      sb = m.toDate()
      se = m.toDate()

      this.setState({
        isSelectBegin: false,
      })
    } else {
      // 如果结束时间小于开始时间，则认为还是选择开始时间
      if (m < sb) {
        sb = m.toDate()
        se = m.toDate()

        this.setState({
          isSelectBegin: false,
        })
      } else {
        // 真正选中结束时间啦
        se = m.toDate()
        this.setState({
          isSelectBegin: true,
        })
      }
    }

    this.props.onChange({
      begin: sb,
      end: se,
    })
  }

  getDisabled(m) {
    let { min, max, disabledDate } = this.props
    // disabledDate优先
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
    const { min, max, begin, end } = this.props
    // 优先 min，其次 begin ，其次 当前
    const mMin = (min ? moment(min) : begin ? moment(begin) : moment()).startOf(
      'month'
    )
    const mMax = (max ? moment(max) : end ? moment(end) : moment()).startOf(
      'month'
    )

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
    const { begin, end, showDateLabel, className, ...rest } = this.props

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
                          begin={begin}
                          end={end}
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
  /** 开始日期 */
  begin: PropTypes.object,
  /** 结束日期 */
  end: PropTypes.object,
  /** 回调函数 */
  onChange: PropTypes.func,
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

Calendar.defaultProps = {
  onChange: _.noop,
}

export default Calendar
