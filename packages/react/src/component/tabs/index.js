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
  /** 当前激活的 tab 索引 */
  tabIndex: PropTypes.number.isRequired,
  /**  数据类型: [tab1, tab2, ...] */
  list: PropTypes.array.isRequired,
  /** 回调函数 */
  onChange: PropTypes.func,
}

Tabs.defaultProps = {
  onChange: _.noop,
}

export default Tabs
