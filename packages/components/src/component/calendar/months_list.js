import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

import VList from '../v_list'
import Month from './month'
import { TYPE } from './util'

const MonthsList = ({
  monthsList,
  selected,
  type,
  onSelectDay,
  getDisabled,
  showDateLabel,
  height,
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

  return (
    <VList
      ref={refList}
      className='m-calendar-content'
      data={monthsList}
      height={height}
      itemHeight={265}
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
    />
  )
}

MonthsList.propTypes = {
  monthsList: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  selected: PropTypes.array,
  type: PropTypes.string,
  onSelectDay: PropTypes.func,
  getDisabled: PropTypes.func,
  showDateLabel: PropTypes.bool,
}

export default MonthsList
