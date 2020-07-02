import React from 'react'
import classNames from 'classnames'
import Cells from './cells'
import { devWarnForHook } from '@gm-mobile/tool'

const CellsForm = (props) => {
  const { className, ...rest } = props
  devWarnForHook(() => {
    if (props.onSubmit) {
      console.warn('非 form，不要提供 onSubmit，请自行外层包裹 form。')
    }
  })

  return <Cells {...rest} className={classNames('m-cells-form', className)} />
}

CellsForm.propTypes = {
  ...Cells.propTypes,
}

export default CellsForm
