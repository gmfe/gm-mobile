import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Flex } from '../flex'
import { Text } from '../text'

const FakeSearch = ({
  placeholder,
  center,
  className,
  style,
  light,
  children,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      column
      justifyCenter
      className={classNames('m-fake-search', className)}
    >
      <Flex
        alignCenter
        justifyCenter={center}
        className={classNames('m-fake-search-inner', {
          'm-bg-white': light,
        })}
      >
        <Text className='m-font m-font-search' />
        &nbsp;
        {placeholder}
        {children}
      </Flex>
    </Flex>
  )
}

FakeSearch.propTypes = {
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  center: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

FakeSearch.defaultProps = {
  placeholder: getLocale('搜索'),
}

export default FakeSearch
