import React, { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { Input as TInput, BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'

// 做了 onInput 到 onChange 的改变

const Input: FC<TaroInputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  form,
  onInput,
  focus,
  className,
  ...rest
}) => {
  const handleChange = (e: BaseEventOrig<TaroInputProps.inputEventDetail>) => {
    onChange && onChange(e)
    onInput && onInput(e)
  }

  return (
    <TInput
      {...rest}
      onInput={handleChange}
      placeholderClass='m-text-placeholder'
      className={classNames(
        'm-input',
        {
          'm-input-form': form,
        },
        className
      )}
    />
  )
}

export default Input
