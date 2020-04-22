import _ from 'lodash'

// 数字键类型定义
const TYPE = {
  DOT: 'dot',
  BACK: 'back',
  NUMBER: 'number',
}

const MSGTYPE = {
  MIN: 'min',
  MAX: 'max',
  PRECISION: 'precision',
}

const KEYS = [
  { type: TYPE.NUMBER, value: '1' },
  { type: TYPE.NUMBER, value: '2' },
  { type: TYPE.NUMBER, value: '3' },
  { type: TYPE.NUMBER, value: '4' },
  { type: TYPE.NUMBER, value: '5' },
  { type: TYPE.NUMBER, value: '6' },
  { type: TYPE.NUMBER, value: '7' },
  { type: TYPE.NUMBER, value: '8' },
  { type: TYPE.NUMBER, value: '9' },
  { type: TYPE.DOT, value: '.' },
  { type: TYPE.NUMBER, value: '0' },
]

const text2Number = (value) => {
  if (value === '') {
    return null
  }
  return _.isNaN(parseFloat(value)) ? null : parseFloat(value)
}

const processValue = (value) => {
  if (value === null) {
    return ''
  }
  return value + ''
}

export { TYPE, KEYS, MSGTYPE, text2Number, processValue }
