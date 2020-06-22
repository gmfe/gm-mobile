import PropTypes from 'prop-types'
import _map from 'lodash/map'

const ActionSheet = {
  render({ data }) {
    return new Promise((resolve, reject) => {
      const itemList = _map(data, (v) => v.text)

      wx.showActionSheet({
        itemList,
        success(res) {
          resolve(data[res.tapIndex].value)
        },
        fail() {
          reject(new Error(''))
        },
      })
    })
  },
  hide() {
    // nothing
  },
}

ActionSheet.propTypes = {
  /** 选项数组 [{ text, value }] */
  data: PropTypes.array.isRequired,
  /** 选择回调 */
  onSelect: PropTypes.func.isRequired,
  /** 取消 */
  onCancel: PropTypes.func.isRequired,
}

export default ActionSheet
