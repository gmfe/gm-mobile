import { getLocale } from '@gm-mobile/locales'
import React, { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react'
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
  searchType,
  onSearchType,
  searchOptions = [],
  type = 'search',
  onCancel = _.noop,
  onSearch = _.noop,
  onChange,
  className,
  autoFocus,
  ...rest
}) => {
  const [showSelect, setShowSelect] = useState(false)
  const needSelect = searchOptions?.length > 0
  const searchTypeText =
    searchOptions?.find((item) => item.key === searchType)?.name || '请选择'

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

  const handleSelect = (key: string) => {
    // eslint-disable-next-line no-unused-expressions
    onSearchType?.(key)
    setShowSelect(false)
  }

  return (
    <View
      {...rest}
      className={classNames('m-search m-flex m-flex-align-center', className, {
        'm-search-select': needSelect,
      })}
    >
      <View className='m-search-input m-flex m-flex-flex'>
        {needSelect ? (
          <View
            className='m-search-select-text'
            onClick={() => setShowSelect((prev) => !prev)}
          >
            <Text>{searchTypeText}</Text>
            <Text className='m-font m-font-arrow-triangle' />
          </View>
        ) : (
          <Text className='m-font m-font-search m-search-icon-search' />
        )}
        {showSelect && (
          <View className='m-search-select-content'>
            {searchOptions.map((option) => {
              return (
                <View
                  key={option.key}
                  className={classNames('m-search-select-content-item', {
                    'm-search-select-active': searchType === option.key,
                  })}
                  onClick={() => handleSelect(option.key)}
                >
                  <Text>{option.name}</Text>
                </View>
              )
            })}
          </View>
        )}
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
