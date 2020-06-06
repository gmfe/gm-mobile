import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import View from '../view'
import Base from './base'

const Textarea = ({ value, disabled, maxLength, form, className, ...rest }) => {
  return (
    <View className='m-textarea-container'>
      <Base
        {...rest}
        value={value}
        className={classNames(
          'm-textarea',
          {
            'm-textarea-form': form,
            disabled,
          },
          className
        )}
        disabled={disabled}
      />
      {maxLength && (
        <View className='m-textarea-max-length'>
          {value.length}/{maxLength}
        </View>
      )}
    </View>
  )
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  /** 小程序 */
  autoHeight: PropTypes.bool,
  form: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Textarea.defaultProps = {
  onChange: _.noop,
}

export default Textarea
