import { getLocale } from '@gm-mobile/locales'
import { Button, CouplingPicker, Flex } from '@gm-mobile/react'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import PickerStatics from './statics'
import {
  cycleListToDayList,
  getEndCycleList,
  getFlag,
  getReceiveTimeParams,
  getStartCycleList,
  isWindowCrossUndelivery,
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

const isInUndeliveryRange = (timeMoment, undeliveryTimes, isStart = true) => {
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
    const bool = isStart
      ? timeMoment.isSame(startMoment, 'minute')
      : timeMoment.isSame(endMoment, 'minute')
    return (
      bool ||
      (timeMoment.isAfter(startMoment) && timeMoment.isBefore(endMoment))
    )
  })
}

const filterByUndeliveryTimes = (
  pickerList,
  isUndelivery,
  undeliveryTimes,
  isStart = true,
  startMoment = null
) => {
  if (isUndelivery !== 1 || !undeliveryTimes || undeliveryTimes.length === 0) {
    return pickerList
  }
  return _.filter(
    _.map(pickerList, (item) => {
      const children = _.filter(item.children, (child) => {
        const childMoment = child.date || child.moment
        // 结束时间需保证 [开始, 结束] 整段不与不可配送时间段交叉，
        // 否则会出现 13:00~18:00 这种包含 14:00~17:00 的可选项，确认时才报错
        if (!isStart && startMoment) {
          return !isWindowCrossUndelivery(
            startMoment,
            childMoment,
            undeliveryTimes
          )
        }
        return !isInUndeliveryRange(childMoment, undeliveryTimes, isStart)
      })
      return {
        ...item,
        children,
      }
    }),
    (item) => item.children.length > 0
  )
}

const cycleToPickerList = (cycleList) => {
  const dayList = cycleListToDayList(cycleList)

  const pickerList = _.map(dayList, (list) => {
    // 不会存在空数组，直接去0即可
    // 上面那行注释，超绝自信，list数组空就崩溃
    // 数据生成的时候又不考虑，自信确定在这里没问题，结果崩了
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

const getStartDateFromValues = (startValues, cycleList, filteredStartDatas) => {
  // 优先用过滤不可配送后的可选项做查找与回退：
  // 否则回退点可能落在不可配送时间段内（如 14:15），
  // endDatas 会被整段过滤，弹层误显示「暂无可选收货时间」。
  // 不传 filteredStartDatas 时行为与旧版一致
  const startDatas =
    filteredStartDatas || cycleToPickerList(getStartCycleList(cycleList))
  const one = _.find(startDatas, (v) => v.value === startValues[0])
  if (!one || !one.children || one.children.length === 0) {
    return startDatas.length > 0 && startDatas[0].children.length > 0
      ? startDatas[0].children[0].date
      : null
  }
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

  const hasAvailableTime =
    startDatas.length > 0 &&
    startDatas.some((item) => item.children && item.children.length > 0)

  let _startValue = startEndValue.startValues
  if (_startValue.length === 0 && hasAvailableTime) {
    _startValue = [startDatas[0].value, startDatas[0].children[0].value]
  }

  const [startValue, setStartValue] = useState(_startValue)

  const startValueDate = useMemo(() => {
    return getStartDateFromValues(startValue, cycleList, startDatas)
  }, [startValue, cycleList, startDatas])
  const endDatas = useMemo(() => {
    if (!startValueDate) return []
    const endDates = cycleToPickerList(
      getEndCycleList(startValueDate, cycleList)
    )
    return filterByUndeliveryTimes(
      endDates,
      is_undelivery,
      undelivery_times,
      false,
      startValueDate
    )
  }, [startValueDate, cycleList, is_undelivery, undelivery_times])

  const hasEndAvailableTime =
    endDatas.length > 0 &&
    endDatas.some((item) => item.children && item.children.length > 0)

  let _endValue = startEndValue.endValues
  if (_endValue.length === 0 && hasEndAvailableTime) {
    _endValue = [endDatas[0].value, endDatas[0].children[0].value]
  }
  const [endValue, setEndValue] = useState(_endValue)

  // 开始时间变化后，结束时间可能不再可选（如整段被不可配送时间段截断），需回退到第一个可选项
  useEffect(() => {
    if (endDatas.length === 0) {
      return
    }
    const has = _.some(endDatas, (item) => {
      if (item.value !== endValue[0]) {
        return false
      }
      return _.some(item.children, (child) => child.value === endValue[1])
    })
    if (!has) {
      setEndValue([endDatas[0].value, endDatas[0].children[0].value])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDatas])

  const handleConfirm = () => {
    if (!hasAvailableTime) {
      PickerStatics.hide()
      return
    }
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
      {hasAvailableTime && hasEndAvailableTime ? (
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
      ) : (
        <div className='m-text-center m-padding-15'>
          {getLocale('暂无可选收货时间')}
        </div>
      )}

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
ReceiveTimePicker.verifyReceiveTime = (
  order,
  enableUndeliveryFilter = false
) => {
  const {
    receive_time_limit,
    cycleList,
    startCycleList,
  } = getReceiveTimeParams(order)
  const { is_undelivery, undelivery_times } = enableUndeliveryFilter
    ? receive_time_limit || {}
    : {}

  // 过滤不可配送时间
  const startDatas = filterByUndeliveryTimes(
    cycleToPickerList(startCycleList),
    is_undelivery,
    undelivery_times
  )

  const hasAvailableTime =
    startDatas.length > 0 &&
    startDatas.some((item) => item.children && item.children.length > 0)

  if (!hasAvailableTime) {
    return false
  }

  // 检查是否有可用的结束时间
  // 与弹层内部使用同一份过滤后的 startDatas 做回退，保证入口校验与弹层展示规则一致
  const startValue = [startDatas[0].value, startDatas[0].children[0].value]
  const startValueDate = getStartDateFromValues(
    startValue,
    cycleList,
    startDatas
  )
  const endDatas = filterByUndeliveryTimes(
    cycleToPickerList(getEndCycleList(startValueDate, cycleList)),
    is_undelivery,
    undelivery_times,
    false,
    startValueDate
  )

  const hasEndAvailableTime =
    endDatas.length > 0 &&
    endDatas.some((item) => item.children && item.children.length > 0)

  return hasEndAvailableTime
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
