import { getLocale } from '@gm-mobile/locales'
import React, { MouseEvent, FC, useState } from 'react'
import _ from 'lodash'

import CouplingPicker from './component/coupling_picker'
import PickerStatics from './statics'
import { Button } from '../button'
import { View } from '../view'
import { ConfirmCouplingPickerProps, ConfirmCouplingPickerTypes } from './types'

const ConfirmCouplingPickerBase: FC<ConfirmCouplingPickerProps> = ({
  datas,
  values,
  onConfirm = _.noop,
  renderOption,
}) => {
  const [_values, setValues] = useState(values)

  const handleValueChange = (values: any) => {
    setValues(values)
  }

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onConfirm(_values)
  }

  return (
    <View>
      <CouplingPicker
        datas={datas}
        values={values}
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

const ConfirmCouplingPicker: ConfirmCouplingPickerTypes = {
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
          <ConfirmCouplingPickerBase
            {...options}
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
  },

  hide() {
    PickerStatics.hide()
  },
}

export default ConfirmCouplingPicker
