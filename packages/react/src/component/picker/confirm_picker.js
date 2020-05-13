import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import Picker from './picker'
import _ from 'lodash'
import PickerStatics from './statics'
import Button from '../button'

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
    const { datas, renderOption } = this.props
    const { values } = this.state

    return (
      <div>
        <Picker
          datas={datas}
          values={values}
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

ConfirmPicker.render = (props) => {
  return new Promise((resolve, reject) => {
    PickerStatics.render({
      title: props.title,
      bottom: true,
      onHide: () => {
        PickerStatics.hide()
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
