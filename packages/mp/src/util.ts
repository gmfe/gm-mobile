let rect: any = null
function getMenuButtonBoundingClientRect() {
  if (!rect) {
    // eslint-disable-next-line
    rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
  }
  return rect
}

let info: any = null
function getSystemInfo() {
  if (info) {
    return Promise.resolve(info)
  }

  info = wx.getSystemInfoSync()
  return Promise.resolve(info)
}

const UtilMP = {
  getMenuButtonBoundingClientRect,
  getSystemInfo,
}

export type PickType<T, K extends keyof T> = T[K]

export default UtilMP
