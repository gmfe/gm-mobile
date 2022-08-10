import _ from 'lodash'
import moment, { Dayjs } from 'dayjs'
// 注意：为了方便，此库的日期都用 moment 格式表示，非 Date
// 选开始才选结束
//
// 收货开始时间不能和结束时间一样
// 如果某周期只有一个点，则此周期不能选

// 数据结构
// const receive_ime = {
//   'msg': '12-26 00:00~12-27 00:00',
//   'receive_time_limit': {
//     'r_start': '01:30',
//     'e_span_time': 14,
//     'receiveTimeSpan': '15',
//     's_span_time': 0,
//     'time_config_id': 'ST1305',
//     'r_end': '01:30',
//     'receiveEndSpan': 1
//   },
//   'receive_time': {
//     'defaultStart': '00:00',
//     'defaultSpanStartFlag': 12,
//     'defaultEnd': '00:00',
//     'defaultSpanEndFlag': 13
//   }
// }

/**
 * 收货时间分可以分为于是和非预售
 * 目前 receiveTimeSpan 为 null，即代表非预售（预算这个一定有值）
 * 非预售可以通过 e_span_time 和 s_span_time 来判断是否跨天
 */
function processReceiveTimeLimit(receive_time_limit: any) {
  const { receiveEndSpan, s_span_time, e_span_time } = receive_time_limit

  return {
    ...receive_time_limit,
    receiveEndSpan:
      receiveEndSpan !== null ? receiveEndSpan : e_span_time - s_span_time,
  }
}

// 处理 默认收货时间时间。receive_time 可能不存在。默认收货时间可能不合法，和当前时间比较
function processStartEndValuesWithCycleList(receiveTime: any, cycleList: any) {
  if (!receiveTime) {
    return {
      startValues: [],
      endValues: [],
    }
  }

  const {
    defaultSpanStartFlag,
    defaultStart,
    defaultSpanEndFlag,
    defaultEnd,
  } = receiveTime

  const start = moment()
    .add(defaultSpanStartFlag, 'days')
    .set('hours', defaultStart.split(':')[0])
    .set('minute', defaultStart.split(':')[1])
    .startOf('minute')

  const end = moment()
    .add(defaultSpanEndFlag, 'days')
    .set('hours', defaultEnd.split(':')[0])
    .set('minute', defaultEnd.split(':')[1])
    .startOf('minute')

  // 默认
  let startValues = [defaultSpanStartFlag, defaultStart]
  let endValues = [defaultSpanEndFlag, defaultEnd]

  const list: any[] = _.flatten(cycleList)
  const hasStart = _.find(list, (v) => +v === +start)
  const hasEnd = _.find(list, (v) => +v === +end)
  if (!hasStart) {
    startValues = []
    endValues = []
  } else if (!hasEnd) {
    endValues = []
  }

  return {
    startValues,
    endValues,
  }
}

function getFlag(m: any) {
  return Math.floor((m - (moment().startOf('day') as any)) / (3600 * 24 * 1000))
}

function getTime(spanTime: DurationInputArg1, timeStr: any, orderTime = null) {
  const time = orderTime ? moment(orderTime) : moment()
  return time
    .add(spanTime, 'days')
    .set('hours', timeStr.split(':')[0])
    .set('minute', timeStr.split(':')[1])
    .startOf('minute')
}

// 获取一个周期的时间
function getOneCycleTimes(
  spanTime: DurationInputArg1,
  receive_time_limit: any,
  orderTime = null
) {
  const { receiveEndSpan, r_start, r_end, receiveTimeSpan } = receive_time_limit

  const now = orderTime ? moment(orderTime) : moment()
  let flag = getTime(spanTime, r_start, orderTime)
  const end = getTime(spanTime + receiveEndSpan, r_end, orderTime)

  const result = []

  while (flag <= end) {
    // 只有大于当前时间才有效
    if (flag > now) {
      result.push(moment(flag))
    }

    flag = flag.add(~~receiveTimeSpan, 'minutes')
  }

  return result
}

// 核心。把周期时间输出一个二维数组，每个元素是当前周期的时间点
function getCycleList(receive_time_limit: any, orderTime = null) {
  const { s_span_time, e_span_time } = receive_time_limit

  const end = e_span_time + 1

  const spanList = _.range(s_span_time, end)

  let cycleList = _.map(spanList, (cycle) => {
    return getOneCycleTimes(cycle, receive_time_limit, orderTime)
  })

  // 开始时间不能和结束时间一样，估需过滤掉只有一个数据的周期
  cycleList = _.filter(cycleList, (cycle) => cycle.length > 1)

  return cycleList
}

// 获取开始收货时间的带选项
function getStartCycleList(cycleList: any) {
  const result = _.map(cycleList, (list) => {
    return list.slice(0, -1)
  })

  return result
}

// 获取开始后货时间的待选项。
// 当开始选择后，自然有开始时间 startDate，根据此时间去查属于哪个周期，自然得到待选项
function getEndCycleList(startDate: any, cycleList: any) {
  let cycleIndex = 0
  _.each(cycleList, (list, i: number) => {
    if (startDate >= list[0]) {
      cycleIndex = i
    }
  })

  return [_.filter(cycleList[cycleIndex], (v) => v > startDate)]
}

// 周期列表格式对用户看到的待选项UI并不友好，估需要转换下，按日期格式分
function cycleListToDayList(cycleList: any) {
  const result = []
  // 打平
  const list = _.flatten(cycleList)

  let dayEnd: Dayjs | null = null
  let temp: any[] = []
  _.each(list, (d: any) => {
    if (!dayEnd) {
      dayEnd = moment(d).endOf('day')
    }
    if (d > dayEnd) {
      result.push(temp)

      dayEnd = moment(d).endOf('day')
      temp = [d]
    } else {
      temp.push(d)
    }
  })

  result.push(temp)

  return result
}

/**
 * 返回计算收货时间需要的参数
 */
const getReceiveTimeParams = (order: any) => {
  order = _.cloneDeep(order)
  const { order_time_limit } = order

  // 运营周期
  let { receive_time, receive_time_limit } = order.receive_time
  const start_order = order_time_limit.start
  const isLastCycle = moment().isBefore(moment(start_order, 'HH:mm'))
  receive_time = receive_time ? { ...receive_time } : null
  // 如果当前时间小于下单的开始和结束时间，则为上个周期
  if (order_time_limit.e_span_time === 1 && isLastCycle) {
    receive_time_limit.s_span_time--
    receive_time_limit.e_span_time--
    if (receive_time) {
      receive_time.defaultSpanEndFlag--
      receive_time.defaultSpanStartFlag--
    }
  }
  const receive_time_limit_2 = processReceiveTimeLimit(receive_time_limit)
  let cycleList = getCycleList(receive_time_limit_2)
  if (receive_time_limit_2.time_config_type === 1) {
    cycleList = _.slice(cycleList, 0, 1)
  }

  // 最早收货日期
  const {
    receiveEndSpan,
    weekdays,
    customer_weekdays,
    r_start,
    e_span_time,
    s_span_time,
  } = receive_time_limit
  let filter = 127
  if (receiveEndSpan !== null) {
    // 预售
    filter = weekdays & customer_weekdays
  }
  const startCycleList = _.filter(getStartCycleList(cycleList), (item) => {
    const isCrossDay =
      receiveEndSpan !== null ? receiveEndSpan : e_span_time - s_span_time
    let flag = getFlag(item[0])
    if (
      isCrossDay &&
      moment(item[0]).isBefore(moment(r_start, 'HH:mm').add(flag, 'day'))
    )
      flag = flag - 1
    return convertDay2Bit(flag) & filter
  })

  return {
    receive_time,
    receive_time_limit,
    isLastCycle,
    cycleList,
    startCycleList,
  }
}

const convertDay2Bit = (flag: any) => {
  const day = moment().add(flag, 'd').day() || 7 // 1-7 周日值为0 修正
  return 1 << (day - 1)
}

export {
  processReceiveTimeLimit,
  processStartEndValuesWithCycleList,
  getFlag,
  getCycleList,
  getStartCycleList,
  getEndCycleList,
  cycleListToDayList,
  getReceiveTimeParams,
}
