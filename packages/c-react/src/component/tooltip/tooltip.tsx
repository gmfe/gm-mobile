import React, {
  cloneElement,
  FC,
  ReactElement,
  HTMLAttributes,
  MouseEvent,
} from 'react'
import { Popup } from '../popup'
import { View } from '../view'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: ReactElement
  title?: string
}

const Tooltip: FC<TooltipProps> = ({ title, content, onClick, children }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    Popup.render({
      title,
      bottom: true,
      children: <View style={{ minHeight: '100px' }}>{content}</View>,
      onHide: Popup.hide,
    })

    onClick && onClick(e)
  }

  return cloneElement(children as ReactElement, {
    onClick: handleClick,
  })
}

export default Tooltip
export type { TooltipProps }
