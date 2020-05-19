import React, { useState, useRef, useEffect } from 'react'
import { Tabs, Popup, RangeCalendar, Flex, Button } from '@gm-mobile/react'
import { getLocale } from '@gm-mobile/locales'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'

const TabDateSelect = ({ tabs, selectedTab, begin, end, onSelect }) => {
  const calendarRef = useRef(null)
  const [tabValue, setTabValue] = useState(selectedTab || tabs[0].value)
  const [beginDate, setBeginDate] = useState(begin)
  const [endDate, setEndDate] = useState(end)

  const _selectedTab = _.find(tabs, (tab) => tab.value === tabValue)

  useEffect(() => {
    calendarRef && calendarRef.current.apiScrollToSelected()
  }, [])

  const handleSaveSelect = () => {
    onSelect({
      selectedTab: tabValue,
      begin: beginDate,
      end: endDate,
    })
  }

  return (
    <div className='m-tab-date-select'>
      <Tabs
        tabs={tabs}
        active={tabValue}
        onChange={(value) => setTabValue(value)}
      />
      <div className='m-tab-date-select-calendar'>
        <RangeCalendar
          ref={calendarRef}
          begin={beginDate}
          end={endDate}
          min={_selectedTab.min}
          max={_selectedTab.max}
          showDateLabel
          onSelect={({ begin, end }) => {
            setBeginDate(begin)
            setEndDate(end)
          }}
        />
      </div>

      <Flex
        alignCenter
        justifyCenter
        className='m-padding-left-20 m-padding-tb-10 m-margin-left-10'
      >
        <div>{_selectedTab.text}</div>
        <div className='m-text-bold m-bg-back m-margin-lr-10 m-padding-tb-5 m-padding-lr-10 m-border-radius'>{`${moment(
          beginDate
        ).format('YYYY-MM-DD')} ~ ${moment(endDate).format(
          'YYYY-MM-DD'
        )}`}</div>
      </Flex>

      <div className='m-padding-lr-15 m-padding-bottom-10'>
        <Button type='primary' onClick={handleSaveSelect} block>
          {getLocale('确定')}
        </Button>
      </div>
    </div>
  )
}

TabDateSelect.render = ({ title, ...rest }) => {
  return new Promise((resolve, reject) => {
    Popup.render({
      title: title,
      bottom: true,
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
}

export default TabDateSelect
