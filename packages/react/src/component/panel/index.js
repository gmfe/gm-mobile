import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGRight from '../../../svg/right-small.svg'

const Panel = ({ title, link, top, bottom, className, children }) => {
  return (
    <div
      className={classNames('m-panel', {
        'm-panel-top': top,
        'm-panel-bottom': bottom,
      })}
    >
      {title && (
        <a href={link} className='m-panel-title m-flex m-flex-align-center'>
          {title}
          {link && <SVGRight className='m-cell-access-icon m-margin-left-5' />}
        </a>
      )}
      <div className='m-panel-content'>{children}</div>
    </div>
  )
}

Panel.propTypes = {
  title: PropTypes.string,
  /** 提供 link，则 title 可点击到达 link */
  link: PropTypes.string,
  /** 贴上边，左上 右上 没有圆角 */
  top: PropTypes.bool,
  /** 贴下边，左下 右下 没有圆角 */
  bottom: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Panel
