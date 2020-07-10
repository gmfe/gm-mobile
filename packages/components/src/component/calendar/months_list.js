import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { is } from '@gm-mobile/tool'

import { LazyList } from '../list'
import Month from './month'
import { TYPE } from './util'

const MonthsList = ({
  monthsList,
  selected,
  type,
  onSelectDay,
  getDisabled,
  showDateLabel,
}) => {
  const refList = useRef(null)

  useEffect(() => {
    if (selected && selected.length) {
      const date = type === TYPE.RANGE ? selected[1] : selected[0]
      const targetId = _.findIndex(
        monthsList,
        (item) =>
          moment(item).year() === moment(date).year() &&
          moment(item).month() === moment(date).month()
      )
      setTimeout(() => {
        refList.current.apiDoScrollToKey(targetId)
      }, 200)
    }
  }, [])

  let listOptions = {
    itemMinHeight: () => 235,
    style: { height: 'calc(100% - 40px)' },
  }

  // itemHeight 目前只支持定高
  if (is.weApp()) {
    listOptions = {
      height: 400,
      itemHeight: 265,
    }
  }

  return (
    <LazyList
      ref={refList}
      className='m-calendar-content'
      data={monthsList}
      renderItem={({ item, index }) => {
        return (
          <Month
            key={index}
            index={index}
            currentMoment={item}
            selected={selected}
            type={type}
            onSelectDay={onSelectDay}
            getDisabled={getDisabled}
            showDateLabel={showDateLabel}
          />
        )
      }}
      {...listOptions}
    />
  )
}

MonthsList.propTypes = {
  monthsList: PropTypes.array.isRequired,
  selected: PropTypes.array,
  type: PropTypes.string,
  onSelectDay: PropTypes.func,
  getDisabled: PropTypes.func,
  showDateLabel: PropTypes.bool,
}

export default MonthsList
