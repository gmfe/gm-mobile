import is from './is'
import _sum from 'lodash/sum'
import _map from 'lodash/map'

export default function (text: string): number {
  return _sum(_map(text, (v) => (is.isChinese(v) ? 2 : 1)))
}
