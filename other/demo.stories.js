import React from 'react'
import { is } from '@gm-common/tool'
import { observable } from 'mobx'
import Scroll from '../packages/react/src/component/scroll'
import useRequest from '../packages/business/src/component/pagination_scroll/hook'

const store = observable({
  getData({ offset, limit }) {
    if (offset > 50) {
    }
  },
})

export const Demo = () => {
  const { data, status } = useRequest({
    onRequest(params) {
      return store.getData(params)
    },
    limit: 10,
  })

  return (
    <div>
      <div> status {status}</div>

      <Scroll style={{ height: '300px' }} data={data} />
    </div>
  )
}

export default {
  title: '开发/DEMO',
}
