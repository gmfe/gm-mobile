import React, { useState, useMemo } from 'react'
import { getLocale } from '@gm-mobile/locales'
import { CouplingPicker, Flex, Button } from '@gm-mobile/react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import PickerStatics from './statics'
import {
  getReceiveTimeParams,
  processStartEndValuesWithCycleList,
  cycleListToDayList,
  getFlag,
  getStartCycleList,
  getEndCycleList,
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
  const two = _.find(one.children, (v) => v.value === startValues[1])

  return two.date
}

const ReceiveTimePicker = ({ onConfirm, order }) => {
  const {
    receive_time_limit,
    receive_time,
    isLastCycle,
    cycleList,
    startCycleList,
  } = getReceiveTimeParams(order)

  const startEndValue = processStartEndValuesWithCycleList(
    receive_time,
    cycleList
  )

  const startDatas = cycleToPickerList(startCycleList)
  let _startValue = startEndValue.startValues
  if (_startValue.length === 0) {
    _startValue = [startDatas[0].value, startDatas[0].children[0].value]
  }

  const startValueDate = useMemo(() => {
    return getStartDateFromValues(_startValue, cycleList)
  }, [_startValue, cycleList])
  const endDatas = useMemo(() => {
    return cycleToPickerList(getEndCycleList(startValueDate, cycleList))
  }, [startValueDate, cycleList])

  let _endValue = startEndValue.endValues
  if (_endValue.length === 0) {
    _endValue = [endDatas[0].value, endDatas[0].children[0].value]
  }

  const [startValue, setStartValue] = useState(_startValue)
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
      <Flex>
        <CouplingPicker
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
        <CouplingPicker
          datas={endDatas}
          values={endValue}
          renderOption={(dataIndex, option) => {
            if (dataIndex === 0) {
              return `${option.text}  ${
                option.date ? weekMap[moment(option.date).day()] : ''
              }`
            }
            return option.text
          }}
          onChange={handleEndChange}
        />
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

ReceiveTimePicker.propTypes = {
  onConfirm: PropTypes.func,
  order: PropTypes.object.isRequired,
}

ReceiveTimePicker.defaultProps = {
  onConfirm: _.noop,
}

/**
 * 普通下单收货时间选择器
 */
export default ReceiveTimePicker
