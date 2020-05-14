import React, { useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import Flex from '../flex'

const Nav = React.forwardRef(
  ({ data, selected, onSelect, horizontal, className, ...rest }, ref) => {
    const refList = useRef(null)

    useImperativeHandle(ref, () => ({
      apiDoScrollToValue: (value) => {
        const d = refList.current.querySelector(`[data-value="${value}"]`)
        if (d) {
          d.scrollIntoView()
        }
      },
    }))

    return (
      <div
        ref={refList}
        {...rest}
        className={classNames(
          'm-nav',
          {
            'm-nav-horizontal': horizontal,
          },
          className
        )}
      >
        <Flex column={!horizontal} className='m-nav-list'>
          {_.map(data, (v) => (
            <Flex
              none
              key={v.value}
              alignCenter
              className={classNames('m-nav-item', {
                active: selected === v.value,
              })}
              data-value={v.value}
              onClick={() => {
                if (selected !== v.value) {
                  onSelect(v.value)
                }
              }}
            >
              {v.text}
            </Flex>
          ))}
        </Flex>
      </div>
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
