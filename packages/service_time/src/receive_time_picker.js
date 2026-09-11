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

// noEnd 模式下结束时间固定为「开始 + 一个间隔」，
// 开始项需保证 [开始, 开始+间隔] 整段不与不可配送时段交叉（与手动模式结束列同一规则），
// 否则计算出的固定结束时间会落在不可配送时段内
const filterStartDatasForNoEnd = (
  pickerList,
  receiveTimeSpan,
  isUndelivery,
  undeliveryTimes
) => {
  if (isUndelivery !== 1 || !undeliveryTimes || undeliveryTimes.length === 0) {
    return pickerList
  }
  return _.filter(
    _.map(pickerList, (item) => {
      const children = _.filter(
        item.children,
        (child) =>
          !isWindowCrossUndelivery(
            child.date,
            moment(child.date).add(~~receiveTimeSpan, 'minutes'),
            undeliveryTimes
          )
      )
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

const ReceiveTimePicker = ({
  onConfirm,
  order,
  enableUndeliveryFilter,
  noEndReceiveTime,
}) => {
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

  // noEnd 模式：最晚收货时间固定为「最早 + 一个间隔(receiveTimeSpan)」，
  // 右列只做静态展示。receiveTimeSpan 缺失或为 0 时无法计算，退化为原双列可编辑模式
  const isNoEnd = noEndReceiveTime && ~~receive_time_limit.receiveTimeSpan > 0

  const startEndValue = processStartEndValuesWithCycleList(
    receive_time,
    cycleList
  )
  const startList = cycleToPickerList(startCycleList)
  const startDatas = isNoEnd
    ? filterStartDatasForNoEnd(
        startList,
        receive_time_limit.receiveTimeSpan,
        is_undelivery,
        undelivery_times
      )
    : filterByUndeliveryTimes(startList, is_undelivery, undelivery_times)

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

  // noEnd 模式下结束时间不经过 state，直接由开始时间推算（同时供展示与回调）
  const { noEndValue, noEndDatas } = useMemo(() => {
    if (!isNoEnd || !startValueDate) {
      return { noEndValue: [], noEndDatas: [] }
    }
    const endDate = moment(startValueDate).add(
      ~~receive_time_limit.receiveTimeSpan,
      'minutes'
    )
    const text = endDate.format('HH:mm')
    return {
      noEndValue: [getFlag(endDate), text],
      // 禁用滚轮只展示固定的结束时间，不给其他可选项
      noEndDatas: [
        {
          date: endDate,
          value: getFlag(endDate),
          text: endDate.format('MM-DD'),
          children: [{ date: endDate, value: text, text }],
        },
      ],
    }
  }, [isNoEnd, startValueDate, receive_time_limit])

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
    if (isNoEnd || endDatas.length === 0) {
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

  const finalEndValue = isNoEnd ? noEndValue : endValue

  const handleConfirm = () => {
    if (!hasAvailableTime) {
      PickerStatics.hide()
      return
    }
    onConfirm({
      startValue,
      endValue: finalEndValue,
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

  // 手动模式与 noEnd 禁用滚轮共用的右列渲染（日期列拼周几）
  const renderEndOption = (dataIndex, option) => {
    if (dataIndex === 0) {
      return `${option.text}${
        option.date ? weekMap[moment(option.date).day()] : ''
      }`
    }
    return option.text
  }

  return (
    <div>
      {hasAvailableTime && (isNoEnd || hasEndAvailableTime) ? (
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
            {isNoEnd && noEndDatas.length > 0 ? (
              // noEnd 模式：结束时间固定为开始+间隔，滚轮禁用、仅展示这一个选项
              <CouplingPicker
                className='m-text-12'
                datas={noEndDatas}
                values={noEndValue}
                renderOption={renderEndOption}
                onChange={_.noop}
                style={{ pointerEvents: 'none', opacity: 0.6 }}
              />
            ) : (
              <CouplingPicker
                className='m-text-12'
                datas={endDatas}
                values={endValue}
                renderOption={renderEndOption}
                onChange={handleEndChange}
              />
            )}
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
  enableUndeliveryFilter = false,
  noEndReceiveTime = false
) => {
  const {
    receive_time_limit,
    cycleList,
    startCycleList,
  } = getReceiveTimeParams(order)
  const { is_undelivery, undelivery_times } = enableUndeliveryFilter
    ? receive_time_limit || {}
    : {}

  const isNoEnd = noEndReceiveTime && ~~receive_time_limit.receiveTimeSpan > 0

  // 过滤不可配送时间（noEnd 模式与弹层内使用同一规则，保证入口校验与展示一致）
  const startDatas = isNoEnd
    ? filterStartDatasForNoEnd(
        cycleToPickerList(startCycleList),
        receive_time_limit.receiveTimeSpan,
        is_undelivery,
        undelivery_times
      )
    : filterByUndeliveryTimes(
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
  noEndReceiveTime: PropTypes.bool,
}

ReceiveTimePicker.defaultProps = {
  onConfirm: _.noop,
  enableUndeliveryFilter: false,
  noEndReceiveTime: false,
}

/**
 * 普通下单收货时间选择器
 */
export default ReceiveTimePicker
