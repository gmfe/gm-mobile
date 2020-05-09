import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const CellsForm = ({ onSubmit, title, className, children, ...rest }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <form
      {...rest}
      onSubmit={handleSubmit}
      className={classNames('m-cells m-cells-form', className)}
    >
      {title && <div className='m-cells-title'>{title}</div>}
      <div className='m-cells-content'>{children}</div>
    </form>
  )
}

CellsForm.propTypes = {
  /** 自动 e.preventDefault */
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CellsForm
