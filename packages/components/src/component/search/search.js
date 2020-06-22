import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _noop from 'lodash/noop'
import Input from '../input/input'
import View from '../view'
import Button from '../button'
import Text from '../text'

const Search = ({
  value,
  placeholder,
  searchText,
  type,
  onCancel,
  onSearch,
  onChange,
  className,
  ...rest
}) => {
  const refInput = React.createRef()
  const handleSearch = (e) => {
    e.preventDefault()

    onSearch(value)
    // 回车后失焦
    ReactDOM.findDOMNode(refInput.current).blur()
  }

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const handleCancel = () => {
    onChange('')
    onCancel()
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
          type='text'
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
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
    </form>
  )
}

Search.propTypes = {
  /** 'search': 带搜索按钮 'cancel'：带取消按钮 */
  type: PropTypes.oneOf(['search', 'cancel']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  /** 即时搜索可不传 */
  onSearch: PropTypes.func,
  onCancel: PropTypes.func,
  placeholder: PropTypes.string,
  /** 自定义搜索按钮文案 */
  searchText: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Search.defaultProps = {
  onSearch: _noop,
  onCancel: _noop,
  placeholder: getLocale('搜索'),
  type: 'search',
}

export default Search
