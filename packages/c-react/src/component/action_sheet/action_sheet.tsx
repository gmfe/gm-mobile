import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import _ from 'lodash'
import { Popup } from '../popup'
import { View } from '../view'
import {
  ActionSheetBaseProps,
  SelectData,
  ActionSheetStatic,
  ActionSheetProps,
} from './type'

const ActionSheetStatics: ActionSheetStatic = {
  render({ title, data, renderItem }) {
    return new Promise((resolve, reject) => {
      Popup.render({
        disabledHeader: true,
        title: title,
        bottom: true,
        children: (
          <ActionSheetBase
            renderItem={renderItem}
            data={data}
            onSelect={(value: string | number) => {
              ActionSheetStatics.hide()
              setTimeout(() => {
                resolve(value)
              }, 50)
            }}
            onCancel={() => {
              ActionSheetStatics.hide()
              setTimeout(() => {
                reject(new Error())
              }, 50)
            }}
          />
        ),
        onHide: () => {
          ActionSheetStatics.hide()
          setTimeout(() => {
            reject(new Error())
          }, 50)
        },
      })
    })
  },
  hide() {
    Popup.hide()
  },
}

const ActionSheetBase: FC<ActionSheetBaseProps> = ({
  data,
  renderItem = (option) => option.text,
  onSelect,
  onCancel,
}) => {
  const handleSelected = (option: SelectData) => {
    onSelect && onSelect(option.value)
  }

  return (
    <View className='m-text-center m-bg-back'>
      <View className='m-bg-white'>
        {_.map(data, (option, index) => (
          <View
            key={option.value}
            className='m-padding-tb-15 m-border-1px-top-after m-bg-white-active-with'
            onClick={() => handleSelected(option)}
          >
            {renderItem(option, index)}
          </View>
        ))}
      </View>
      <View className='m-bg-white m-margin-top-10'>
        <View
          className='m-bg-white-active-with m-padding-tb-15'
          onClick={onCancel}
        >
          {getLocale('取消')}
        </View>
      </View>
    </View>
  )
}

export const ActionSheet = Object.assign(ActionSheetBase, ActionSheetStatics)

export default ActionSheet
export type { ActionSheetProps }
