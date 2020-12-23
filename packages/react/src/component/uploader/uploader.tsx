import React, { useRef, FC, ChangeEvent, DragEvent } from 'react'
import { is } from '@gm-mobile/c-tool'
import classNames from 'classnames'
import { UploaderProps, UploaderFile } from './types'

const Uploader: FC<UploaderProps> = ({
  accept,
  multiple = false,
  onUpload,
  children,
  className,
  ...rest
}) => {
  const refInput = useRef<HTMLInputElement>(null)

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => {
    const uploadedFiles = (e as DragEvent<HTMLInputElement>).dataTransfer
      ? (e as DragEvent<HTMLInputElement>).dataTransfer.files
      : (e as ChangeEvent<HTMLInputElement>).target.files!

    const files: UploaderFile[] = Array.from(uploadedFiles).map((file) =>
      Object.assign(file, { preview: window.URL.createObjectURL(file) })
    )

    onUpload(files, e)
  }

  const handleClick = () => {
    refInput.current!.value = ''
    refInput.current!.click()
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

export default Uploader
