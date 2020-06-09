import React, { useState } from 'react'
import Input from './input'
import classNames from 'classnames'

const InputPassword = (props) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className='m-input-password'>
      <Input {...props} type={show ? 'text' : 'password'} />
      <span className='m-input-password-icon' onClick={handleShow}>
        <i
          className={classNames('m-font', {
            'm-font-password-close': !show,
            'm-font-password-open': show,
          })}
        />
      </span>
    </div>
  )
}

InputPassword.propTypes = {
  ...Input.propTypes,
}

export default InputPassword
