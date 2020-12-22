import { getLocale } from '@gm-mobile/locales'
import React, { FC, useState } from 'react'
import _ from 'lodash'

import Picker from './component/picker'
import PickerStatics from './statics'
import { Button } from '../button'
import { View } from '../view'
import { ConfirmPickerProps, ConfirmPickerTypes } from './types'

const ConfirmPickerBase: FC<ConfirmPickerProps> = ({
  datas,
  values,
  headers,
  onConfirm = _.noop,
  renderOption,
}) => {
  const [_values, setValues] = useState(values)
  const handleValueChange = (values: any[]) => {
    setValues(values)
  }

  const handleConfirm = () => {
    onConfirm(_values)
  }

  return (
    <View>
      <Picker
        datas={datas}
        values={_values}
        headers={headers}
        renderOption={renderOption}
        onChange={handleValueChange}
      />
      <View className='m-margin-15'>
        <Button
          type='primary'
          onClick={handleConfirm}
          style={{ width: '100%' }}
        >
          {getLocale('确定')}
        </Button>
      </View>
    </View>
  )
}

const ConfirmPicker: ConfirmPickerTypes = {
  render(options) {
    return new Promise((resolve, reject) => {
      PickerStatics.render({
        title: options.title,
        bottom: true,
        onHide: () => {
          setTimeout(() => {
            reject(new Error())
          }, 50)
        },
        children: (
          <ConfirmPickerBase
            {...options}
            onConfirm={(values: any[]) => {
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
  },

  hide() {
    PickerStatics.hide()
  },
}

export default ConfirmPicker
