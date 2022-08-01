import React, { ReactElement, useState } from 'react'
import {
  Tabs,
  Popup,
  RangeCalendar,
  Flex,
  Button,
  SelectPicker,
  View,
  Text,
  CustomTabbar,
} from '@gm-mobile/c-react'
import { getLocale } from '@gm-mobile/locales'
import _ from 'lodash'
import moment from 'dayjs'
import getScreenHeight from './get_screen_height'
import {
  TabDateSelectProps,
  TabDateSelectServiceTime,
  TabDateSelectStaticTypes,
} from './types'

const getServiceTimeRange = (
  serviceTime: TabDateSelectServiceTime
): { min: Date; max: Date } => {
  const maxSpanEnd =
    serviceTime.type === 2
      ? serviceTime.receive_time_limit.e_span_time
      : serviceTime.order_time_limit.e_span_time
  const days30 = moment().add(30, 'd')
  const daysWithSpan = moment().add(maxSpanEnd, 'd')
  const maxTemp = daysWithSpan.isAfter(days30) ? days30 : daysWithSpan
  return {
    min: moment(maxTemp).add(-3, 'month').toDate(),
    max: maxTemp.toDate(),
  }
}

const HEIGHT_RATIO = 0.85

function TabDateSelectBase({
  tabs,
  selectedTab,
  begin,
  end,
  onSelect,
  serviceTimeList,
}: TabDateSelectProps): ReactElement<any, any> | null {
  const [tabDate, setTabDate] = useState({
    beginDate: begin,
    endDate: end,
    activeTab: _.find(tabs, (tab) => tab.value === selectedTab) || tabs[0],
  })
  const { beginDate, endDate, activeTab } = tabDate
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
      data: serviceTimeList!,
      value: activeTab.selectedServiceTime!.value,
    }).then((value) => {
      const serviceTime = _.find(
        serviceTimeList,
        (item) => item.value === value
      )
      const { min, max } = getServiceTimeRange(serviceTime!)
      const newDateState = {} as typeof tabDate
      if (
        moment(beginDate) < moment(min) ||
        moment(beginDate) > moment(max) ||
        moment(endDate) < moment(min) ||
        moment(endDate) > moment(max)
      ) {
        newDateState.beginDate = newDateState.endDate = max
      }
      newDateState.activeTab = {
        ...activeTab,
        min,
        max,
        selectedServiceTime: serviceTime,
      }
      setTabDate((tabDate) => ({ ...tabDate, ...newDateState }))
      return null
    })
  }

  const handleTabChange = (value: string) => {
    if (value !== activeTab.value) {
      const tab = _.find(tabs, (tab) => tab.value === value)

      setTabDate({
        beginDate: moment().toDate(),
        endDate: moment().toDate(),
        activeTab: tab!,
      })
    }
  }

  const tabbarHeight = CustomTabbar.getCustomTabbarHeight() // 若是有自定已tabbar，需要底部撑开，防止被遮挡
  const calendarHeight = getScreenHeight() * HEIGHT_RATIO - 180 - tabbarHeight // popup头部 + tab + 底部

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
        <View className='m-tab-date-select-calendar m-flex-flex m-bg-white'>
          <RangeCalendar
            key={activeTab.value}
            begin={beginDate}
            end={endDate}
            min={activeTab.min}
            max={activeTab.max}
            height={calendarHeight}
            showDateLabel
            onSelect={({ begin, end }) => {
              setTabDate((tabDate) => ({
                ...tabDate,
                beginDate: begin,
                endDate: end,
              }))
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

const TabDateSelectStatic: TabDateSelectStaticTypes = {
  render({ title, ...rest }) {
    return new Promise((resolve, reject) => {
      Popup.render({
        title: title,
        bottom: true,
        height: `${HEIGHT_RATIO * 100}%`,
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
  },
  hide() {
    Popup.hide()
  },
}

export const TabDateSelect = Object.assign(
  TabDateSelectBase,
  TabDateSelectStatic
)

export default TabDateSelect
