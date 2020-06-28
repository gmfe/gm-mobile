import React, { useState } from 'react'
import {
  Tabs,
  Popup,
  RangeCalendar,
  Flex,
  Button,
  SelectPicker,
  View,
  Text,
} from '@gm-mobile/components'
import { getLocale } from '@gm-mobile/locales'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'

const getServiceTimeRange = (serviceTime) => {
  const maxSpanEnd =
    serviceTime.type === 2
      ? serviceTime.receive_time_limit.e_span_time
      : serviceTime.order_time_limit.e_span_time
  const days30 = moment().add(30, 'd')
  const daysWithSpan = moment().add(maxSpanEnd, 'd')
  const maxTemp = daysWithSpan.isAfter(days30) ? days30 : daysWithSpan
  return {
    min: moment(maxTemp).add(-3, 'month'),
    max: maxTemp,
  }
}

const TabDateSelect = ({
  tabs,
  selectedTab,
  begin,
  end,
  onSelect,
  serviceTimeList,
}) => {
  const [beginDate, setBeginDate] = useState(begin)
  const [endDate, setEndDate] = useState(end)
  const [activeTab, setActiveTab] = useState(
    _.find(tabs, (tab) => tab.value === selectedTab) || tabs[0]
  )

  const handleSaveSelect = () => {
    onSelect({
      selectedTab: activeTab.value,
      begin: beginDate,
      end: endDate,
      serviceTimeId: activeTab.selectedServiceTime
        ? activeTab.selectedServiceTime.value
        : null,
    })
  }

  const handleSelectServiceTime = () => {
    SelectPicker.render({
      data: serviceTimeList,
      value: activeTab.selectedServiceTime.value,
    }).then((value) => {
      const serviceTime = _.find(serviceTimeList, (item) => item.value === value)
      const { min, max } = getServiceTimeRange(serviceTime)
      if (
        moment(beginDate) < moment(min) ||
        moment(beginDate) > moment(max) ||
        moment(endDate) < moment(min) ||
        moment(endDate) > moment(max)
      ) {
        setBeginDate(max)
        setEndDate(max)
      }
      setActiveTab({
        ...activeTab,
        min,
        max,
        selectedServiceTime: serviceTime,
      })
    })
  }

  const handleTabChange = (value) => {
    if (value !== activeTab.value) {
      const tab = _.find(tabs, (tab) => tab.value === value)
      setActiveTab(tab)
      setBeginDate(tab.max)
      setEndDate(tab.max)
    }
  }

  return (
    <Flex column className='m-tab-date-select'>
      <Tabs tabs={tabs} active={activeTab.value} onChange={handleTabChange} />
      {activeTab.selectedServiceTime && (
        <Flex
          alignCenter
          justifyCenter
          className='m-bg-white m-border-1px-top-before m-bg-back m-border-1px-bottom-after'
        >
          <Flex
            alignCenter
            justifyCenter
            className='m-padding-tb-5 m-padding-lr-10'
            onClick={handleSelectServiceTime}
          >
            <View className='m-margin-right-5'>{`${activeTab.selectedServiceTime.text}`}</View>
            <Text className='m-font m-font-arrow-triangle m-tab-date-select-icon' />
          </Flex>
        </Flex>
      )}

      <Flex flex column justifyBetween>
        <View className='m-tab-date-select-calendar m-flex-flex m-bg-back'>
          <RangeCalendar
            begin={beginDate}
            end={endDate}
            min={activeTab.min}
            max={activeTab.max}
            showDateLabel
            onSelect={({ begin, end }) => {
              setBeginDate(begin)
              setEndDate(end)
            }}
          />
        </View>

        <Flex alignCenter justifyCenter className='m-padding-tb-10'>
          <View>{activeTab.text}</View>
          <View className='m-text-bold m-bg-back m-margin-left-10 m-padding-tb-5 m-padding-lr-10 m-border-radius'>{`${moment(
            beginDate
          ).format('YYYY-MM-DD')} ~ ${moment(endDate).format(
            'YYYY-MM-DD'
          )}`}</View>
        </Flex>

        <View className='m-padding-lr-15 m-padding-bottom-10'>
          <Button type='primary' onClick={handleSaveSelect} block>
            {getLocale('确定')}
          </Button>
        </View>
      </Flex>
    </Flex>
  )
}

TabDateSelect.render = ({ title, ...rest }) => {
  return new Promise((resolve, reject) => {
    Popup.render({
      title: title,
      bottom: true,
      height: '90%',
      children: (
        <TabDateSelect
          {...rest}
          onSelect={(result) => {
            TabDateSelect.hide()
            setTimeout(() => {
              resolve(result)
            }, 50)
          }}
        />
      ),
      onHide: () => {
        TabDateSelect.hide()
        setTimeout(() => {
          reject(new Error())
        }, 50)
      },
    })
  })
}

TabDateSelect.hide = () => {
  Popup.hide()
}

TabDateSelect.propTypes = {
  /** 切换 tabs 配置 [{ text, value, min, max }] */
  tabs: PropTypes.array.isRequired,
  /** 选中的 tab value */
  selectedTab: PropTypes.any,
  /** 开始日期 */
  begin: PropTypes.object,
  /** 结束日期 */
  end: PropTypes.object,
  /** 确定回调 */
  onSelect: PropTypes.func.isRequired,
  /** 运营周期列表 */
  serviceTimeList: PropTypes.array,
}

export default TabDateSelect
