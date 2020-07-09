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
  return wx.getSystemInfo().then((data) => {
    info = data
    return data
  })
}

const UtilMP = {
  getMenuButtonBoundingClientRect,
  getSystemInfo,
}

export default UtilMP
