import React from 'react'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import Text from '../text'
import Item from './item'

const FlowBtnTabbar = ({
  leftConfigs,
  rightConfigs,
  selected,
  onTabChange,
  className,
  FlowButton,
  onFlowButtonClick,
  ...rest
}) => {
  return (
    <Flex {...rest} className={classNames('m-tabbar', className)}>
      <Flex flex className='m-margin-right-20'>
        {_map(leftConfigs, (config, index) => (
          <Item
            key={index}
            config={config}
            index={index}
            onClick={onTabChange}
            selected={selected}
          />
        ))}
      </Flex>
      <Flex
        justifyCenter
        alignCenter
        onClick={onFlowButtonClick}
        className='m-tabbar-flow-wrapper m-bg-primary-active-with'
      >
        {FlowButton || <Text className='m-font m-font-plus' />}
      </Flex>
      <Flex flex className='m-margin-left-20'>
        {_map(rightConfigs, (config, index) => (
          <Item
            key={index}
            config={config}
            index={index}
            onClick={onTabChange}
            selected={selected}
          />
        ))}
      </Flex>
    </Flex>
  )
}

FlowBtnTabbar.propTypes = {
  /** 左边按钮 */
  leftConfigs: PropTypes.array,
  /** 右边按钮 */
  rightConfigs: PropTypes.array,
  /** pathname，根据 config.to 匹配 */
  selected: PropTypes.string.isRequired,
  /** tab 点击回调 */
  onTabChange: PropTypes.func,
  /** 中间按钮 */
  FlowButton: PropTypes.element,
  /** 中间按钮点击事件 */
  onFlowButtonClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

FlowBtnTabbar.defaultProps = {
  onTabChange: _noop,
  onFlowButtonClick: _noop,
}

export default FlowBtnTabbar
