import { getLocale } from '@gm-mobile/locales'
import { Button, CouplingPicker, Flex } from '@gm-mobile/react'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import PickerStatics from './statics'
import {
  cycleListToDayList,
  getCycleList,
  getEndCycleList,
  getFlag,
  getReceiveTimeParams,
  getStartCycleList,
  processReceiveTimeLimit,
  processStartEndValuesWithCycleList,
} from './utils'

const weekMap = {
  0: getLocale('周日'),
  1: getLocale('周一'),
  2: getLocale('周二'),
  3: getLocale('周三'),
  4: getLocale('周四'),
  5: getLocale('周五'),
  6: getLocale('周六'),
}

const isInUndeliveryRange = (timeMoment, undeliveryTimes) => {
  if (!undeliveryTimes || undeliveryTimes.length === 0) {
    return false
  }
  return _.some(undeliveryTimes, ({ start, end }) => {
    const startMoment = moment(timeMoment).set({
      hours: start.split(':')[0],
      minute: start.split(':')[1],
    })
    const endMoment = moment(timeMoment).set({
      hours: end.split(':')[0],
      minute: end.split(':')[1],
    })
    return (
      timeMoment.isSame(startMoment, 'minute') ||
      timeMoment.isSame(endMoment, 'minute') ||
      (timeMoment.isAfter(startMoment) && timeMoment.isBefore(endMoment))
    )
  })
}

const filterByUndeliveryTimes = (pickerList, isUndelivery, undeliveryTimes) => {
  if (isUndelivery !== 1 || !undeliveryTimes || undeliveryTimes.length === 0) {
    return pickerList
  }
  return _.map(pickerList, (item) => ({
    ...item,
    children: _.filter(
      item.children,
      (child) => !isInUndeliveryRange(child.date, undeliveryTimes)
    ),
  }))
}

const cycleToPickerList = (cycleList) => {
  const dayList = cycleListToDayList(cycleList)

  const pickerList = _.map(dayList, (list) => {
    // 不会存在空数组，直接去0即可
    return {
      date: list[0],
      value: getFlag(list[0]),
      text: list[0].format('MM-DD'),
      children: _.map(list, (v) => {
        const text = v.format('HH:mm')
        return {
          date: v,
          value: text,
          text,
        }
      }),
    }
  })

  return pickerList
}

const getStartDateFromValues = (startValues, cycleList) => {
  const startDatas = cycleToPickerList(getStartCycleList(cycleList))

  const one = _.find(startDatas, (v) => v.value === startValues[0])
  let two = _.find(one.children, (v) => v.value === startValues[1])
  if (!two) {
    two = one.children[0]
  }
  return two.date
}

const ReceiveTimePicker = ({ onConfirm, order, enableUndeliveryFilter }) => {
  const {
    receive_time_limit,
    receive_time,
    isLastCycle,
    cycleList,
    startCycleList,
  } = getReceiveTimeParams(order)

  const { is_undelivery, undelivery_times } = enableUndeliveryFilter
    ? receive_time_limit || {}
    : {}

  const startEndValue = processStartEndValuesWithCycleList(
    receive_time,
    cycleList
  )

  const startDatas = filterByUndeliveryTimes(
    cycleToPickerList(startCycleList),
    is_undelivery,
    undelivery_times
  )
  let _startValue = startEndValue.startValues
  if (_startValue.length === 0) {
    _startValue = [startDatas[0].value, startDatas[0].children[0].value]
  }

  const [startValue, setStartValue] = useState(_startValue)

  const startValueDate = useMemo(() => {
    return getStartDateFromValues(startValue, cycleList)
  }, [startValue, cycleList])
  const endDatas = useMemo(() => {
    return filterByUndeliveryTimes(
      cycleToPickerList(getEndCycleList(startValueDate, cycleList)),
      is_undelivery,
      undelivery_times
    )
  }, [startValueDate, cycleList, is_undelivery, undelivery_times])

  let _endValue = startEndValue.endValues
  if (_endValue.length === 0) {
    _endValue = [endDatas[0].value, endDatas[0].children[0].value]
  }
  const [endValue, setEndValue] = useState(_endValue)

  const handleConfirm = () => {
    onConfirm({
      startValue,
      endValue,
      isLastCycle,
      receiveTimeLimit: receive_time_limit,
    })
  }

  const handleStartChange = (values) => {
    setStartValue([...values])
  }

  const handleEndChange = (values) => {
    setEndValue([...values])
  }

  return (
    <div>
      <Flex className='m-border-top m-padding-top-10'>
        <Flex column flex>
          <div className='m-text-center'>{getLocale('最早收货时间')}</div>
          <CouplingPicker
            className='m-text-12'
            datas={startDatas}
            values={startValue}
            renderOption={(dataIndex, option) => {
              if (dataIndex === 0) {
                return `${option.text} ${
                  option.date ? weekMap[moment(option.date).day()] : ''
                }`
              }
              return option.text
            }}
            onChange={handleStartChange}
          />
        </Flex>
        <Flex column flex>
          <div className='m-text-center'>{getLocale('最晚收货时间')}</div>
          <CouplingPicker
            className='m-text-12'
            datas={endDatas}
            values={endValue}
            renderOption={(dataIndex, option) => {
              if (dataIndex === 0) {
                return `${option.text}${
                  option.date ? weekMap[moment(option.date).day()] : ''
                }`
              }
              return option.text
            }}
            onChange={handleEndChange}
          />
        </Flex>
      </Flex>

      <div className='m-margin-15'>
        <Button
          type='primary'
          onClick={handleConfirm}
          style={{ width: '100%' }}
        >
          {getLocale('确定')}
        </Button>
      </div>
    </div>
  )
}

ReceiveTimePicker.render = (props) => {
  return new Promise((resolve, reject) => {
    PickerStatics.render({
      bottom: true,
      title: getLocale('收货时间'),
      onHide: () => {
        setTimeout(() => {
          reject(new Error())
        }, 50)
      },
      children: (
        <ReceiveTimePicker
          {...props}
          onConfirm={(values) => {
            PickerStatics.hide()
            setTimeout(() => {
              resolve(values)
            }, 50)
          }}
        />
      ),
    })
  })
}

ReceiveTimePicker.hide = () => {
  PickerStatics.hide()
}

// 校验是否有周期时间
ReceiveTimePicker.verifyReceiveTime = (order) => {
  const { order_time_limit } = order

  // 运营周期
  const receive_time_limit = _.cloneDeep(order.receive_time.receive_time_limit)
  const start_order = order_time_limit.start
  const isLastCycle = moment().isBefore(moment(start_order, 'HH:mm'))
  // 如果当前时间小于下单的开始和结束时间，则为上个周期
  if (order_time_limit.e_span_time === 1 && isLastCycle) {
    receive_time_limit.s_span_time--
    receive_time_limit.e_span_time--
  }
  const receive_time_limit_2 = processReceiveTimeLimit(receive_time_limit)
  const cycleList = getCycleList(receive_time_limit_2)

  return cycleList.length !== 0
}

ReceiveTimePicker.propTypes = {
  onConfirm: PropTypes.func,
  order: PropTypes.object.isRequired,
  enableUndeliveryFilter: PropTypes.bool,
}

ReceiveTimePicker.defaultProps = {
  onConfirm: _.noop,
  enableUndeliveryFilter: false,
}

/**
 * 普通下单收货时间选择器
 */
export default ReceiveTimePicker
