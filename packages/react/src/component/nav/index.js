import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import Flex from '../flex'

const Nav = ({
  data,
  selected,
  onSelect,
  horizontal,
  horizontalMore,
  className,
  ...rest
}) => {
  return (
    <div
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
            onClick={() => {
              onSelect(v.value)
            }}
          >
            {v.text}
          </Flex>
        ))}
      </Flex>
    </div>
  )
}

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
  horizontalMore: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Nav
