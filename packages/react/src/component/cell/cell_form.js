import React from 'react'
import PropTypes from 'prop-types'
import Cell from './cell'
import classNames from 'classnames'

const CellForm = ({ label, labelWidth, className, children, ...rest }) => {
  return (
    <Cell
      {...rest}
      left={
        <div className='m-cell-form-label' style={{ width: labelWidth }}>
          {label}
        </div>
      }
      className={classNames('m-cell-form', className)}
    >
      {children}
    </Cell>
  )
}

CellForm.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default CellForm
