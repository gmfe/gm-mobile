import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@gm-mobile/c-react'
import classNames from 'classnames'
import _ from 'lodash'

const Header = ({ title, hideBack, onBack, right, className, ...rest }) => {
  const handleBack = () => {
    onBack()
  }

  return (
    <Flex
      justifyBetween
      {...rest}
      className={classNames('m-header m-text-white m-padding-lr-15', className)}
    >
      <Flex alignCenter>
        {!hideBack && (
          <i
            className='m-font m-font-angle-left m-padding-right-15'
            onClick={handleBack}
          />
        )}
        <div
          className={classNames('m-text-18 m-padding-right-10', {
            'padding-left-8': hideBack,
          })}
        >
          {title}
        </div>
      </Flex>
      {right}
    </Flex>
  )
}

Header.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
  hideBack: PropTypes.bool,
  right: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object,
}

Header.defaultProps = {
  onBack: _.noop,
}

export default Header
