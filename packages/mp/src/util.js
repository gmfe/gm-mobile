let rect = null
function getMenuButtonBoundingClientRect() {
  if (!rect) {
    // eslint-disable-next-line
    rect = wx.getMenuButtonBoundingClientRect()
  }
  return rect
}

let info = null
function getSystemInfo() {
  if (info) {
    return Promise.resolve(info)
  }

  // eslint-disable-next-line
  info = wx.getSystemInfoSync()
  return Promise.resolve(info)
}

const UtilMP = {
  getMenuButtonBoundingClientRect,
  getSystemInfo,
}

export default UtilMP
