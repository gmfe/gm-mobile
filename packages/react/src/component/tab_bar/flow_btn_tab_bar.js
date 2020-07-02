import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Flex, Text } from '@gm-mobile/components'
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
        {_.map(leftConfigs, (config, index) => (
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
        className='m-tabbar-flow-wrapper m-bg-white-active-with'
      >
        {FlowButton || <Text className='m-font m-font-plus' />}
      </Flex>
      <Flex flex className='m-margin-left-20'>
        {_.map(rightConfigs, (config, index) => (
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
  onTabChange: _.noop,
  onFlowButtonClick: _.noop,
}

export default FlowBtnTabbar
