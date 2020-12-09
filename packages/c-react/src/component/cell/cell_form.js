import React from 'react'
import PropTypes from 'prop-types'
import Cell from './cell'
import View from '../view'
import Text from '../text'
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
            <View className='m-cell-form-label' style={{ width: labelWidth }}>
              {required && <Text className='m-text-red'>*</Text>}
              {label}
            </View>
          ) : null
        }
        className={classNames('m-cell-form', className)}
      >
        {children}
      </Cell>
      {error && <View className='m-cell-form-error'>{error}</View>}
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
