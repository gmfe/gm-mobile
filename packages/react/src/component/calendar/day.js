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
    const { currentMoment, value, begin, end, disabled, label } = this.props

    const wm = currentMoment.month()
    const vm = value.month()

    if (wm !== vm) {
      return <Flex flex className='m-calendar-day' />
    }

    const bv = begin && +moment(begin).startOf('day')
    const ev = end && +moment(end).startOf('day')
    const v = +value.startOf('day')

    const cn = classNames('m-calendar-day', {
      'm-calendar-day-label': label,
      disabled: disabled,
      active: begin && v > bv && v < ev,
      'm-calendar-day-point': begin && end && (v === bv || v === ev),
    })

    return (
      <Flex
        flex
        column
        justifyCenter
        alignCenter
        className={cn}
        onClick={disabled ? _.noop : this.handleClick}
      >
        {this.nowMountStart === +value.startOf('day')
          ? getLocale('今天')
          : value.date()}
        {label && (
          <small>
            {v === bv && v === ev && getLocale('单天')}
            {v === bv && v !== ev && getLocale('起始')}
            {v !== bv && v === ev && getLocale('结束')}
          </small>
        )}
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
  label: PropTypes.bool,
}

export default Day
