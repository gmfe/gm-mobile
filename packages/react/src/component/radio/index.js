import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import Flex from '../flex'
import SVGCheck from '../../../svg/check.svg'

const Radio = (props) => {
  const {
    className,
    disabled,
    checked,
    style,
    onChange,
    children,
    ...rest
  } = props

  return (
    <Flex
      alignCenter
      className={classNames(
        'm-padding-tb-5 m-padding-lr-10 m-radio',
        {
          disabled,
        },
        className
      )}
      {...rest}
      onClick={disabled ? _.noop : () => onChange(!checked)}
    >
      {children}
      {checked && <SVGCheck className='m-radio-icon m-text-18' />}
    </Flex>
  )
}

Radio.propTypes = {
  /** 选中态 */
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
}

Radio.defaultProps = {
  onChange: _.noop,
}

export default Radio
