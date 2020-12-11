import React, { FC } from 'react'
import Cell from './cell'
import View from '../view'
import Text from '../text'
import classNames from 'classnames'

import type { CellFormProps } from './types'

const CellForm: FC<CellFormProps> = ({
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

export default CellForm
