import React, { FC } from 'react'
import { Page } from '../page'
import Search from './search'
import { SearchPageProps } from './type'
import _ from 'lodash'

const SearchPage: FC<SearchPageProps> = ({
  active,
  header,
  value,
  onChange,
  onSearch = _.noop,
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

export default SearchPage
