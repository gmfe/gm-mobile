import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import SVGSearch from '../../../svg/search.svg'

const FakeSearch = (props) => {
  const {
    placeholder,
    center,
    light,
    className,
    style,
    children,
    ...rest
  } = props

  return (
    <Flex
      {...rest}
      column
      justifyCenter
      className={classNames(
        'm-fake-search',
        {
          'm-fake-search-light': light,
        },
        className
      )}
    >
      <Flex alignCenter justifyCenter={center} className='m-fake-search-inner'>
        <SVGSearch />
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
