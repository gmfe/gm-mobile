import React, { ChangeEvent, FC } from 'react'
import classNames from 'classnames'
import { Input as TInput, BaseEventOrig } from '@tarojs/components'
import { InputProps as TaroInputProps } from '@tarojs/components/types/Input'
import { TInputProps } from './type'

// 做了 onInput 到 onChange 的改变

const Input: FC<TInputProps> = ({
  onChange,
  isForm,
  onInput,
  focus,
  className,
  ...rest
}) => {
  const handleChange = (
    e:
      | BaseEventOrig<TaroInputProps.inputEventDetail>
      | ChangeEvent<HTMLInputElement>
  ) => {
    onChange && onChange(e as ChangeEvent<HTMLInputElement>)
    onInput && onInput(e as BaseEventOrig<TaroInputProps.inputEventDetail>)
  }

  return (
    <TInput
      {...rest}
      onInput={handleChange}
      placeholderClass='m-text-placeholder'
      className={classNames(
        'm-input',
        {
          'm-input-form': isForm,
        },
        className
      )}
    />
  )
}

export default Input
