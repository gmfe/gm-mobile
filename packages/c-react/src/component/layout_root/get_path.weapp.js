import { getCurrentPages } from '@tarojs/taro'
import _ from 'lodash'

export default function getPath() {
  const route = _.last(getCurrentPages()).route
  return `/${route}`
}
