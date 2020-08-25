import React, { useState, useMemo } from 'react'
import { getLocale } from '@gm-mobile/locales'
import { CouplingPicker, Flex, Button, View } from '@gm-mobile/components'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import PickerStatics from './statics'
import { getReceiveTimeParams } from './utils'

// 获取运营时间范围
// 只关注时间，不关注日期
const getCycList = ({
  receiveStartSpan = 0, // 0:当日 1:次日
  r_start, // 当日时间
  receiveEndSpan,
  r_end, // 次日时间
  receiveTimeSpan, // 间隔
}) => {
  let start = moment()
    .add(receiveStartSpan, 'day')
    .set({
      hours: r_start.split(':')[0],
      minute: r_start.split(':')[1],
    })
    .startOf('minute')

  const end = moment()
    .add(receiveEndSpan, 'day')
    .set({
      hours: r_end.split(':')[0],
      minute: r_end.split(':')[1],
    })
    .startOf('minute')

  const result = []
  let index = 0
  let max = moment(start).endOf('day') // 记录最晚的时间，用于判断是否跨天

  while (start <= end) {
    const obj = {
      moment: moment(start),
      text: start.format('HH:mm'),
      value: start.format('HH:mm'),
    }
    if (start.isAfter(max)) {
      index += 1
      max = _.cloneDeep(start).endOf('day')
    }
    result[index] ? result[index].push(obj) : (result[index] = [obj])

    start = start.add(~~receiveTimeSpan, 'minutes')
  }

  return result
}

const getStartCycleList = (cycleList) => {
  return _.filter(
    _.map(cycleList, (list, i) => {
      if (i === cycleList.length - 1) {
        return _.slice(list, 0, -1)
      }
      return list
    }),
    (list) => list.length
  )
}

const getEndCycleList = (startValue, cycleList) => {
  const startMoment = moment()
    .add(startValue[0], 'day')
    .set({
      hours: startValue[1].split(':')[0],
      minute: startValue[1].split(':')[1],
    })
  const endDates = _.map(cycleList, (list) => {
    return _.filter(list, (v) => v.moment > startMoment)
  })
  return _.filter(endDates, (list) => list.length)
}

// 生成pick需要的当日，日次数据
const columnGenerator = (cycList) => {
  return _.map(cycList, (v) => ({
    text: v[0].moment.isBefore(moment().endOf('day'))
      ? getLocale('当日')
      : getLocale('次日'),
    value: v[0].moment.isBefore(moment().endOf('day')) ? 0 : 1,
    children: v,
  }))
}

const MultiOrderReceiveTimePicker = ({ onConfirm, order }) => {
  const { receive_time_limit } = useMemo(() => {
    return getReceiveTimeParams(order)
  }, [order])

  const _cycleList = getCycList(receive_time_limit)

  const startDatas = useMemo(() => {
    const cycleList = getStartCycleList(_cycleList)
    return columnGenerator(cycleList)
  }, [_cycleList])
  const [startValue, setStartValue] = useState(() => [
    startDatas[0].value,
    startDatas[0].children[0].value,
  ])

  const [endValue, setEndValue] = useState([0, '17:00'])

  // 右边的列要根据左边联动
  const rightColumn = useMemo(() => {
    const cycList = getEndCycleList(startValue, _cycleList)
    return columnGenerator(cycList)
  }, [startValue, _cycleList])

  const handleConfirm = () => {
    onConfirm({
      startValue,
      endValue,
    })
  }

  const handleStartChange = (values) => {
    setStartValue([...values])
  }

  const handleEndChange = (values) => {
    setEndValue([...values])
  }

  return (
    <View>
      <Flex>
        <CouplingPicker
          datas={startDatas}
          values={startValue}
          onChange={handleStartChange}
        />
        <View className='m-gap-20' />
        <CouplingPicker
          datas={rightColumn}
          values={endValue}
          onChange={handleEndChange}
        />
      </Flex>

      <View className='m-margin-15'>
        <Button
          type='primary'
          onClick={handleConfirm}
          style={{ width: '100%' }}
        >
          {getLocale('确定')}
        </Button>
      </View>
    </View>
  )
}

MultiOrderReceiveTimePicker.render = (props) => {
  return new Promise((resolve, reject) => {
    PickerStatics.render({
      bottom: true,
      title: props.title,
      onHide: () => {
        setTimeout(() => {
          reject(new Error())
        }, 50)
      },
      children: (
        <MultiOrderReceiveTimePicker
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

MultiOrderReceiveTimePicker.hide = () => {
  PickerStatics.hide()
}

MultiOrderReceiveTimePicker.propTypes = {
  onConfirm: PropTypes.func,
  order: PropTypes.object.isRequired,
}

MultiOrderReceiveTimePicker.defaultProps = {
  onConfirm: _.noop,
}

/**
 * 多日下单收货时间选择器
 */
export default MultiOrderReceiveTimePicker
