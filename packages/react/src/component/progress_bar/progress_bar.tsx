import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 百分比 */
  percentage: number
  /** 文字是否在进度条里面 */
  textInside?: boolean
  /** 是否显示文字 */
  showText?: boolean
  /** 显示的文字 */
  text?: string
}

const ProgressBar: FC<ProgressBarProps> = ({
  showText,
  className,
  percentage,
  text,
  textInside = false,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames('m-progress', className)}>
      <div className='m-progress-bar'>
        <div className='m-progress-bar-outer'>
          <div
            className='m-progress-bar-inner'
            style={{ width: `${percentage}%` }}
          >
            {showText && textInside && <div>{text || `${percentage}%`}</div>}
          </div>
        </div>
      </div>

      {showText && !textInside && (
        <div className='m-progress-bar-text'>{text || `${percentage}%`}</div>
      )}
    </div>
  )
}

export default ProgressBar
export type { ProgressBarProps }
