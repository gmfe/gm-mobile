import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'

import Flex from '../flex'
import SVGSuccess from '../../../svg/success.svg'
import SVGCircle from '../../../svg/circle.svg'

const Checkbox = (props) => {
  const {
    className,
    style,
    disabled,
    checked,
    onChange,
    inline,
    children,
    ...rest
  } = props

  return (
    <Flex
      alignCenter
      onClick={disabled ? _.noop : () => onChange(!checked)}
      className={classNames(
        'm-checkbox',
        {
          disabled: disabled,
          'm-checkbox-inline': inline,
        },
        className
      )}
      {...rest}
    >
      {checked ? (
        <SVGSuccess className='m-text-18 m-text-primary m-padding-right-5 m-checkbox-icon' />
      ) : (
        <SVGCircle className='m-text-18 m-padding-right-5 m-checkbox-icon' />
      )}
      {children}
    </Flex>
  )
}

Checkbox.propTypes = {
  /** 选中态 */
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  inline: PropTypes.bool,
}

Checkbox.defaultProps = {
  onChange: _.noop,
}

export default Checkbox
