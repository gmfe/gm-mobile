import React, { useRef, useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import Bottom from './bottom'
import { Page, Canvas } from '@gm-mobile/react'

const getDefaultImage = (width, height) => {
  return `https://image.document.guanmai.cn/product_img/1587956803853-3681999445086317.png?imageView2/1/w/${width}/h/${height}|watermark/4/text/562-5ZCN5Yy65Z-f/font/5a6L5L2T/fontsize/360/fill/I0I4QjZCNg==/rotate/-20/uw/${parseInt(
    width / 2
  )}/uh/${parseInt(height / 3)}`
}

export const Edit = ({ isEdit, output, image, onSave }) => {
  const canvasRef = useRef(null)
  const [area, setArea] = useState({
    width: 0,
    height: 0,
  })
  useEffect(() => {
    const page = document.getElementById('signature-edit')
    page.addEventListener(
      'touchmove',
      function (e) {
        // 阻止IOS的橡皮筋滚动
        e.preventDefault()
      },
      { passive: false }
    )

    const bottom = document.getElementById('signature-bottom')
    setArea({
      width: document.body.clientWidth,
      height: document.body.clientHeight - bottom.clientHeight,
    })
  }, [setArea])

  const handleReset = () => {
    canvasRef.current.reset()
  }

  const handleSubmit = () => {
    if (output === 'base64') {
      onSave(canvasRef.current.toDataURL('image/png'))
    } else {
      canvasRef.current.toBlob((blob) => {
        onSave(blob)
      }, 'image/png')
    }
  }

  const getImage = (image, width, height) => {
    if (!width || !height) return ''
    return image || getDefaultImage(width, height)
  }

  const { width, height } = area
  return (
    <Page
      white
      id='signature-edit'
      bottom={
        <Bottom
          isEdit={!!isEdit}
          onReset={handleReset}
          onSubmit={handleSubmit}
        />
      }
    >
      <Canvas
        ref={canvasRef}
        background={getImage(image, width, height)}
        width={width}
        height={height}
      />
    </Page>
  )
}

Edit.propTypes = {
  onSave: PropTypes.func,
  image: PropTypes.string,
  isEdit: PropTypes.bool,
  output: PropTypes.oneOf(['base64', 'blob']),
}

Edit.defaultProps = {
  output: 'base64',
}

export default memo(Edit)
