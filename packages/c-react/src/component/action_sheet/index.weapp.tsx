import _ from 'lodash'
import { ActionSheetProps } from './type'

const ActionSheet: ActionSheetProps = {
  render({ data }) {
    return new Promise((resolve, reject) => {
      const itemList = _.map(data, (v) => v.text)

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
export default ActionSheet
