import React, { useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import Flex from '../flex'
import View from '../view'
import ScrollIntoView from '../scroll_into_view'

const Nav = React.forwardRef(
  ({ data, selected, onSelect, horizontal, className, ...rest }, ref) => {
    const refId = useRef((Math.random() + '').slice(2))
    const [targetId, setTargetId] = useState('')

    useImperativeHandle(ref, () => ({
      apiDoScrollToValue: (value) => {
        setTargetId(`m-nav-item-${refId.current}-${value}`)
      },
    }))

    return (
      <View
        {...rest}
        className={classNames(
          'm-nav',
          {
            'm-nav-horizontal': horizontal,
          },
          className
        )}
      >
        <ScrollIntoView
          horizontal={horizontal}
          className='m-nav-list'
          targetId={targetId}
        >
          <Flex column={!horizontal}>
            {_.map(data, (v) => (
              <Flex
                none
                column
                key={v.value}
                alignCenter
                justifyCenter
                className={classNames('m-nav-item', {
                  active: selected === v.value,
                })}
                id={`m-nav-item-${refId.current}-${v.value}`}
                onClick={() => {
                  if (selected !== v.value) {
                    onSelect(v.value)
                  }
                }}
              >
                <View class='m-text-14'>{v.text}</View>
                <View class='m-text-12'>{v.subText}</View>
              </Flex>
            ))}
          </Flex>
        </ScrollIntoView>
      </View>
    )
  }
)

Nav.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  selected: PropTypes.any.isRequired,
  onSelect: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Nav
