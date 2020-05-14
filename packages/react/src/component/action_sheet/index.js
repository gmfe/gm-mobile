import React from 'react'
import Popup from '../popup'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { getLocale } from '@gm-mobile/locales'

const ActionSheetStatics = {
  render({ title, data }) {
    return new Promise((resolve, reject) => {
      Popup.render({
        title: title,
        bottom: true,
        children: (
          <ActionSheet
            data={data}
            onSelected={(value) => {
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

const ActionSheet = ({ data, onSelected, onCancel }) => {
  const handleSelected = (option) => {
    onSelected(option.value)
  }

  return (
    <div className='m-text-center m-bg-back'>
      <div className='m-bg-white'>
        {_.map(data, (option) => (
          <div
            key={option.value}
            className='m-padding-tb-10 m-border-1px-top-after m-active-bg-white'
            onClick={() => handleSelected(option)}
          >
            {option.text}
          </div>
        ))}
      </div>
      <div className='m-bg-white m-margin-top-10'>
        <div className='m-active-bg-white m-padding-tb-10' onClick={onCancel}>
          {getLocale('取消')}
        </div>
      </div>
    </div>
  )
}

Object.assign(ActionSheet, ActionSheetStatics)

ActionSheet.propTypes = {
  /** 选项数组 [{ text, value }] */
  data: PropTypes.array.isRequired,
  /** 选择回调 */
  onSelected: PropTypes.func.isRequired,
  /** 取消 */
  onCancel: PropTypes.func.isRequired,
}

export default ActionSheet
