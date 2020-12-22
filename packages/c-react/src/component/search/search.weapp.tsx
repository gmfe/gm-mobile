import { getLocale } from '@gm-mobile/locales'
import React, { ChangeEvent, FC, FormEvent, MouseEvent } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Input from '../input/input'
import { View } from '../view'
import { Button } from '../button'
import { Text } from '../text'
import { SearchProps } from './type'

const Search: FC<SearchProps> = ({
  value,
  placeholder = getLocale('搜索'),
  searchText,
  type = 'search',
  onCancel = _.noop,
  onSearch = _.noop,
  onChange,
  className,
  autoFocus,
  ...rest
}) => {
  const handleSearch = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    onSearch && onSearch(value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleCancel = () => {
    onChange('')
    onCancel && onCancel()
  }

  const handleClean = () => {
    onChange('')
  }

  return (
    <View
      {...rest}
      className={classNames('m-search m-flex m-flex-align-center', className)}
    >
      <View className='m-search-input m-flex m-flex-flex'>
        <Text className='m-font m-font-search m-search-icon-search' />
        <Input
          type='text'
          confirmType='search'
          value={value}
          focus={autoFocus}
          autoFocus={autoFocus}
          onChange={handleChange}
          placeholder={placeholder}
          onConfirm={handleSearch}
        />
        {value && (
          <Text
            className='m-font m-font-close-circle m-search-icon-close'
            onClick={handleClean}
          />
        )}
      </View>
      {type === 'search' ? (
        <Button type='link' mini onClick={handleSearch}>
          {searchText || getLocale('搜索')}
        </Button>
      ) : (
        <Button type='link' mini onClick={handleCancel}>
          {searchText || getLocale('取消')}
        </Button>
      )}
    </View>
  )
}

export default Search
