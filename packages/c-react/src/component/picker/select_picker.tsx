import { getLocale } from '@gm-mobile/locales'
import _ from 'lodash'

import ConfirmPicker from './confirm_picker'
import { Option, SelectPickerTypes } from './types'

const SelectPicker: SelectPickerTypes = {
  render({ data, value, title }) {
    // 转换下
    const datas = [data]
    const values = []

    // 找不到, 默认展示第一个
    const item = _.find(data, (v) => v.value === value)
    if (item) {
      values[0] = item.value
    } else {
      values[0] = data[0].value
    }

    return ConfirmPicker.render({
      title: title || getLocale('选择'),
      datas,
      values,
    }).then((values) => {
      // 回传当前选中值
      const item = _.find(data, (v) => v.value === values[0]) as Option
      return item.value
    })
  },

  hide() {
    ConfirmPicker.hide()
  },
}

export default SelectPicker
