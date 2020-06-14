import React from 'react'
import noop from 'lodash/noop'
import map from 'lodash/map'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Item from './item'
import Flex from '../flex'

const Tabbar = ({ configs, selected, onTabChange, className, ...rest }) => {
  return (
    <Flex {...rest} className={classNames('m-tabbar', className)}>
      {map(configs, (config, index) => (
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
  onTabChange: noop,
}

export default Tabbar
