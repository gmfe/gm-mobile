import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { is } from '@gm-mobile/c-tool'
import classNames from 'classnames'

const Uploader = ({
  accept,
  multiple,
  onUpload,
  children,
  className,
  ...rest
}) => {
  const refInput = useRef(null)

  const handleUpload = (e) => {
    const uploadedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files
    const max = multiple ? uploadedFiles.length : 1

    const files = []
    for (let i = 0; i < max; i++) {
      const file = uploadedFiles[i]
      file.preview = window.URL.createObjectURL(file)
      files.push(file)
    }

    onUpload(files, e)
  }

  const handleClick = () => {
    refInput.current.value = null
    refInput.current.click()
  }

  return (
    <div {...rest} className={classNames('m-uploader', className)}>
      <div
        className={classNames({
          'm-uploader-warp': !!children,
          'm-uploader-default': !children,
        })}
        onClick={handleClick}
      >
        {children || (
          <div className='m-uploader-icon-wrap'>
            <i className='m-font m-font-plus m-uploader-icon' />
          </div>
        )}
      </div>
      <input
        type='file'
        ref={refInput}
        className='m-uploader-input'
        multiple={!is.weixin() && multiple}
        accept={accept}
        onChange={handleUpload}
      />
    </div>
  )
}

Uploader.propTypes = {
  multiple: PropTypes.bool,
  onUpload: PropTypes.func.isRequired,
  accept: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

Uploader.defaultProps = {
  multiple: false,
}

export default Uploader
