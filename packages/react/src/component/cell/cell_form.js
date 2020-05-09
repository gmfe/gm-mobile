import React from 'react'
import PropTypes from 'prop-types'
import Cell from './cell'
import classNames from 'classnames'

const CellForm = ({
  label,
  labelWidth,
  error,
  required,
  className,
  children,
  ...rest
}) => {
  return (
    <>
      <Cell
        {...rest}
        left={
          label ? (
            <div className='m-cell-form-label' style={{ width: labelWidth }}>
              {required && <span className='m-text-red'>*</span>}
              {label}
            </div>
          ) : null
        }
        className={classNames('m-cell-form', className)}
      >
        <label className='m-cell-form-body-label'>{children}</label>
      </Cell>
      {error && <div className='m-cell-form-error'>{error}</div>}
    </>
  )
}

CellForm.propTypes = {
  /** 标签 */
  label: PropTypes.string,
  /** 标签宽度 */
  labelWidth: PropTypes.string,
  /** 错误信息显示 */
  error: PropTypes.string,
  /** 必填项 */
  required: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CellForm
