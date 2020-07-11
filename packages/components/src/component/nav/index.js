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
          className={classNames('m-nav-list m-flex', {
            'm-flex-column': !horizontal,
          })}
          targetId={targetId}
        >
          {_.map(data, (v) => (
            <Flex
              none
              key={v.value}
              alignCenter
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
              {v.text}
            </Flex>
          ))}
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
