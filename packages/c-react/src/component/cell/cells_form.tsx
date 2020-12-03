import React, { FC } from 'react'
import classNames from 'classnames'
import Cells from './cells'

import { CellsFormProps } from './types'

const CellsForm: FC<CellsFormProps> = ({ className, ...rest }) => {
  return <Cells {...rest} className={classNames('m-cells-form', className)} />
}

export default CellsForm
