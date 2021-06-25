import { noop } from 'lodash'
import React, { FC, useEffect } from 'react'
import is from './is'

export const Normal: FC = () => {
  /**
   * import is from '@gm-mobile/c-tool/is'
   * import pinyin from '@gm-mobile/c-tool/pinyin'
   * import uuid from '@gm-mobile/c-tool/uuid'
   * import warn from '@gm-mobile/c-tool/warn'
   */
  useEffect(() => {
    window.addEventListener('eventName', noop)
  }, [])
  return (
    <div>
      <div>检查</div>
      {Object.keys(is).map((key) => {
        // @ts-ignore
        const res = is[key]('/** args **/')
        return (
          <div key={key}>
            {key}: {res.toString()}
          </div>
        )
      })}
    </div>
  )
}

export default {
  title: '工具/Checker',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
}
