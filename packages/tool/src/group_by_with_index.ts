import _groupBy from 'lodash/groupBy'

export default function groupByWithIndex(
  list: any[],
  cb: (value: any, index: number) => any
) {
  let i = 0
  return _groupBy(list, (v) => {
    return cb(v, i++)
  })
}
