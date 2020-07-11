import { getSystemInfoSync } from '@tarojs/taro'

const getScreenHeight = () => {
  const { windowHeight } = getSystemInfoSync()
  return windowHeight
}

export default getScreenHeight
