import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

const Tabs = ({ tabIndex, list, onChange }) => {
  return (
    <div className='m-tabs'>
      {_.map(list, (v, i) => (
        <div
          key={v}
          className={classNames('m-tabs-item', {
            active: tabIndex === i,
          })}
          onClick={() => onChange(i)}
        >
          <div className='m-tabs-item-text'>{v}</div>
        </div>
      ))}
    </div>
  )
}

Tabs.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}

Tabs.defaultProps = {
  onChange: _.noop,
}

export default Tabs
