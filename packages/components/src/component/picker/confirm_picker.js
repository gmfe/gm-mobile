import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import Picker from './component/picker'
import _ from 'lodash'
import PickerStatics from './statics'
import Button from '../button'
import View from '../view'

class ConfirmPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: props.values,
    }
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
    const { datas, renderOption, headers } = this.props
    const { values } = this.state

    return (
      <View>
        <Picker
          datas={datas}
          values={values}
          headers={headers}
          renderOption={renderOption}
          onChange={this.handleChange}
        />
        <View className='m-margin-15'>
          <Button
            type='primary'
            onClick={this.handleConfirm}
            style={{ width: '100%' }}
          >
            {getLocale('确定')}
          </Button>
        </View>
      </View>
    )
  }
}

ConfirmPicker.render = (props) => {
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
        <ConfirmPicker
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

ConfirmPicker.hide = () => {
  PickerStatics.hide()
}

ConfirmPicker.propTypes = {
  title: PropTypes.string,
  datas: PropTypes.array.isRequired,
  /** 每列数据title, 格式为 [header, ...] */
  headers: PropTypes.array,
  values: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ConfirmPicker.defaultProps = {
  onConfirm: _.noop,
  onCancel: _.noop,
}

export default ConfirmPicker
