import is from './is'
import _ from 'lodash'

export default function (text: string): number {
  return _.sum(_.map(text, (v) => (is.chinese(v) ? 2 : 1)))
}
