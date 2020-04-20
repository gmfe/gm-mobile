import React from 'react'
import PropTypes from 'prop-types'
import Cell from './cell'
import classNames from 'classnames'

const CellForm = ({
  label,
  labelWidth,
  error,
  className,
  children,
  ...rest
}) => {
  return (
    <>
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
      {error && <div className='m-cell-form-error'>{error}</div>}
    </>
  )
}

CellForm.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.string.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CellForm
