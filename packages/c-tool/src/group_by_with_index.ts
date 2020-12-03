import _ from 'lodash'

export default function groupByWithIndex(
  list: any[],
  cb: (value: any, index: number) => any
) {
  let i = 0
  return _.groupBy(list, (v) => {
    return cb(v, i++)
  })
}
