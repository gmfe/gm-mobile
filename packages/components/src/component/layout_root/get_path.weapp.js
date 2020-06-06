import { Current } from '@tarojs/taro'

export default function getPath() {
  return Current.router.path
}
