import React from 'react'
import { PageMP, Cells, Cell } from '../../../../packages/mp/src'

const Other = () => {
  return (
    <PageMP>
      <Cells>
        <Cell
          access
          onClick={() => {
            wx.navigateTo({
              url: '/pages_b/page/index',
            })
          }}
        >
          page
        </Cell>
      </Cells>
    </PageMP>
  )
}

export default Other
