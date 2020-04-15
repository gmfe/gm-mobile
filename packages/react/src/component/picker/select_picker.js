import { getLocale } from '@gm-mobile/locales'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ConfirmPicker from './confirm_picker'

const SelectPicker = {
  render({ data, value, title }) {
    // 转换下
    const datas = [data]
    const values = []

    // 找不到得有个默认的
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
      // 转回去
      const item = _.find(data, (v) => v.value === values[0])
      return item.value
    })
  },
  hide() {
    ConfirmPicker.hide()
  },
}

SelectPicker.propTypes = {
  /** 格式:[{ value, text }] */
  data: PropTypes.array,
  /** 底部弹框标题展示 */
  title: PropTypes.string,
  /** 当前选中项 */
  value: PropTypes.any,
}

export default SelectPicker
