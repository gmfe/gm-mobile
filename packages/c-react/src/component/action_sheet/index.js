import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import _ from 'lodash'

import PropTypes from 'prop-types'

import Popup from '../popup'
import { View } from '../view'

const ActionSheetStatics = {
  render({ title, data, renderItem }) {
    return new Promise((resolve, reject) => {
      Popup.render({
        disabledHeader: true,
        title: title,
        bottom: true,
        children: (
          <ActionSheet
            renderItem={renderItem}
            data={data}
            onSelect={(value) => {
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

const ActionSheet = ({ data, renderItem, onSelect, onCancel }) => {
  const handleSelected = (option) => {
    onSelect(option.value)
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

Object.assign(ActionSheet, ActionSheetStatics)

ActionSheet.propTypes = {
  /** 选项数组 [{ text, value }] */
  data: PropTypes.array.isRequired,
  /** 选择回调 */
  onSelect: PropTypes.func.isRequired,
  /** 取消 */
  onCancel: PropTypes.func.isRequired,
  /** 自定义选项样式 */
  renderItem: PropTypes.func,
}

ActionSheet.defaultProps = {
  renderItem: (option) => option.text,
}

export default ActionSheet
