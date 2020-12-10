import React, { FC } from 'react'
import classNames from 'classnames'
import Cells from './cells'
// import { devWarnForHook } from '@gm-mobile/c-tool'

import type { CellsFormProps } from './types'

const CellsForm: FC<CellsFormProps> = ({ className, ...rest }) => {
  // devWarnForHook(() => {
  //   if (props.onSubmit) {
  //     console.warn('非 form，不要提供 onSubmit，请自行外层包裹 form。')
  //   }
  // })

  return <Cells {...rest} className={classNames('m-cells-form', className)} />
}

export default CellsForm
