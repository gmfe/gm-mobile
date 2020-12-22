import { getLocale } from '@gm-mobile/locales'
import React, { ChangeEvent, FC, FormEvent, createRef } from 'react'
import ReactDOM from 'react-dom'
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
  const refInput = createRef<HTMLInputElement>()
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSearch && onSearch(value)
    console.log(1111)
    // 回车后失焦
    ;(ReactDOM.findDOMNode(refInput.current) as HTMLElement).blur()
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
    <form
      {...rest}
      className={classNames('m-search m-flex m-flex-align-center', className)}
      onSubmit={handleSearch}
    >
      <View className='m-search-input m-flex m-flex-flex'>
        <Text className='m-font m-font-search m-search-icon-search' />
        <Input
          ref={refInput}
          type='search'
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {value && (
          <Text
            className='m-font m-font-close-circle m-search-icon-close'
            onClick={handleClean}
          />
        )}
      </View>
      {type === 'search' ? (
        <Button type='primary' mini htmlType='submit'>
          {searchText || getLocale('搜索')}
        </Button>
      ) : (
        <Button type='link' mini onClick={handleCancel}>
          {searchText || getLocale('取消')}
        </Button>
      )}
    </form>
  )
}

export default Search
