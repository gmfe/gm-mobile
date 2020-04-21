import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import Flex from '../flex'

const Tabs = (props) => {
  const { tabs, activeTab, onChange, className, type, ...rest } = props

  const handleChange = (value) => {
    onChange(value)
  }

  return (
    <Flex
      alignCenter
      {...rest}
      className={classNames(`m-tabs m-tabs-${type}`, className)}
    >
      <Flex row className='m-tabs-content'>
        {_.map(tabs, (tab) => (
          <Flex
            justifyCenter
            alignCenter
            className={classNames('m-tabs-item', {
              active: activeTab === tab.value,
            })}
            key={tab.value}
            onClick={() => handleChange(tab.value)}
          >
            <div className='m-tabs-item-text'>{tab.text}</div>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

Tabs.propTypes = {
  /** tabs数据，格式为 [{ value, text }] */
  tabs: PropTypes.array.isRequired,
  /** 当前选中tab对应value值 */
  activeTab: PropTypes.any.isRequired,
  /** 触发回调函数 */
  onChange: PropTypes.func,
  /** 暂定义为默认式，标签式，胶囊式 */
  type: PropTypes.oneOf(['default', 'label', 'capsule']),
  className: PropTypes.string,
}

Tabs.defaultProps = {
  type: 'default',
  onChange: _.noop,
}

export default Tabs
