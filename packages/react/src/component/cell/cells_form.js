import React from 'react'
import classNames from 'classnames'
import Cells from './cells'

const CellsForm = ({ className, ...rest }) => {
  return <Cells {...rest} className={classNames('m-cells-form', className)} />
}

CellsForm.propTypes = {
  ...Cells.propTypes,
}

export default CellsForm
