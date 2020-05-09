import React, { useState } from 'react'
import Input from './input'
import SVGPasswordClose from '../../../svg/password-close.svg'
import SVGPasswordOpen from '../../../svg/password-open.svg'

const InputPassword = (props) => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <div className='m-input-password'>
      <Input {...props} type={show ? 'text' : 'password'} />
      <span className='m-input-password-icon' onClick={handleShow}>
        {show ? <SVGPasswordOpen /> : <SVGPasswordClose />}
      </span>
    </div>
  )
}

InputPassword.propTypes = {
  ...Input.propTypes,
}

export default InputPassword
