import React from 'react'
import PropTypes from 'prop-types'
import Page from '../page'
import Search from './search'
import _noop from 'lodash/noop'

const SearchPage = ({
  active,
  header,
  value,
  onChange,
  onSearch,
  onCancel,
  children,
  ...rest
}) => {
  const newHeader = active ? (
    <Search
      value={value}
      onChange={onChange}
      autoFocus
      type='cancel'
      onSearch={onSearch}
      onCancel={onCancel}
    />
  ) : (
    header
  )

  return (
    <Page {...rest} header={newHeader}>
      {children}
    </Page>
  )
}

SearchPage.propTypes = {
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  /** 存在建议搜索词，所以需要把 value 交给调用方控制 */
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  ...Page.propTypes,
}

SearchPage.defaultProps = {
  onSearch: _noop,
}

export default SearchPage
