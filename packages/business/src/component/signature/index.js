import React, { useState } from 'react'
import PropTypes from 'prop-types'

import View from './view'
import Edit from './edit'

export const Signature = ({ isEdit, image, disabledEdit, output, onSave }) => {
  const [isEdited, setEdit] = useState(!!isEdit)

  if (!isEdited && image) {
    return (
      <View
        disabledEdit={disabledEdit}
        image={image}
        onClick={() => {
          setEdit(true)
        }}
      />
    )
  } else {
    return (
      <Edit image={image} output={output} onSave={onSave} isEdit={isEdit} />
    )
  }
}

Signature.propTypes = {
  /** 输出类型 */
  output: PropTypes.oneOf(['base64', 'blob']),
  /** 不传直接进入Edit编辑场景 */
  image: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  /** 是否禁止修改签名, 默认false  */
  disabledEdit: PropTypes.bool,
  /** 存在image时，是否直接进入编辑状态
   * Edit场景可以是首次签名(按钮文案为确认签收), View场景是修改签名(按钮文案为保存)
   * 默认false
   */
  isEdit: PropTypes.bool,
}

Signature.defaultProps = {
  output: 'base64',
}

export default Signature
