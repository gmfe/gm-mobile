import is from './is'
import _sum from 'lodash/sum'
import _map from 'lodash/map'

export default function (text) {
  return _sum(_map(text, (v) => (is.chinese(v) ? 2 : 1)))
}
