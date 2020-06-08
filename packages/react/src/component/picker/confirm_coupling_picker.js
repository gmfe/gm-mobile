import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import CouplingPicker from './component/coupling_picker'
import _ from 'lodash'
import PickerStatics from './statics'
import { Button } from '@gm-mobile/components'

class ConfirmCouplingPicker extends React.Component {
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
    e.preventDefault()
    this.props.onConfirm(this.state.values)
  }

  render() {
    const { datas, renderOption } = this.props
    const { values } = this.state

    return (
      <div>
        <CouplingPicker
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

ConfirmCouplingPicker.render = (props) => {
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
        <ConfirmCouplingPicker
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

ConfirmCouplingPicker.hide = () => {
  PickerStatics.hide()
}

ConfirmCouplingPicker.propTypes = {
  title: PropTypes.string,
  datas: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ConfirmCouplingPicker.defaultProps = {
  onConfirm: _.noop,
  onCancel: _.noop,
}

export default ConfirmCouplingPicker
