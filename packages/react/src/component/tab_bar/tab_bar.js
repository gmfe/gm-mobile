import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import Item from './item'

const Tabbar = ({ configs, selected, onTabChange, className, ...rest }) => {
  return (
    <Flex {...rest} className={classNames('m-tabbar', className)}>
      {_.map(configs, (config, index) => (
        <Item
          key={index}
          config={config}
          index={index}
          onClick={onTabChange}
          selected={selected}
        />
      ))}
    </Flex>
  )
}

Tabbar.propTypes = {
  /** tabbar 配置 [{ name, to, icon, activeIcon, badge, showBadge}] */
  configs: PropTypes.array.isRequired,
  /** pathname，根据 config.to 匹配 */
  selected: PropTypes.string.isRequired,
  /** tab 点击回调 */
  onTabChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Tabbar.defaultProps = {
  onTabChange: _.noop,
}

export default Tabbar
