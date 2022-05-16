import { getLocale } from '@gm-mobile/locales'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Button from '../button'
import { Search } from '../search'
import Picker from './component/picker'
import PickerStatics from './statics'

/**
 * 带搜索功能的选择器，仅支持单栏和单选
 */
class SearchPicker extends React.Component {
  constructor(props) {
    super(props)
    const { data, value } = props
    const selectedItem = _.find(data, (item) => item.value === value)
    this.state = {
      datas: data.length ? [data] : [],
      values: selectedItem ? [selectedItem.value] : [data[0].value],
    }
  }

  handleSearch = (value) => {
    const searchData = this.props.data.filter(
      (item) => item.text.indexOf(value) > -1
    )
    this.setState({
      datas: searchData.length ? [searchData] : [],
      values: [searchData[0]] || [],
    })
  }

  handleChange = (values) => {
    this.setState({
      values,
    })
  }

  handleConfirm = (e) => {
    this.props.onConfirm(this.state.values)
  }

  render() {
    const { headers, placeholder, searchBtnText, renderOption } = this.props
    const { datas, values } = this.state

    return (
      <div>
        <Search
          placeholder={placeholder}
          searchText={searchBtnText}
          onChange={this.handleSearch}
        />
        <Picker
          datas={datas}
          values={values}
          headers={headers}
          renderOption={renderOption}
          onChange={this.handleChange}
        />
        <div className='m-margin-15'>
          <Button
            type='primary'
            onClick={this.handleConfirm}
            style={{ width: '100%' }}
          >
            {getLocale('确定')}
          </Button>
        </div>
      </div>
    )
  }
}

SearchPicker.render = (props) => {
  return new Promise((resolve, reject) => {
    PickerStatics.render({
      title: props.title,
      bottom: true,
      onHide: () => {
        setTimeout(() => {
          reject(new Error())
        }, 50)
      },
      children: (
        <SearchPicker
          {...props}
          onConfirm={(values) => {
            PickerStatics.hide()
            setTimeout(() => {
              resolve(values)
            }, 50)
          }}
          onCancel={() => {
            PickerStatics.hide()
            setTimeout(() => {
              reject(new Error())
            }, 50)
          }}
        />
      ),
    })
  })
}

SearchPicker.hide = () => {
  PickerStatics.hide()
}

SearchPicker.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  /** 每列数据title, 格式为 [header, ...] */
  headers: PropTypes.array,
  placeholder: PropTypes.string,
  searchBtnText: PropTypes.string,
  value: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

SearchPicker.defaultProps = {
  onConfirm: _.noop,
  onCancel: _.noop,
}

export default SearchPicker
