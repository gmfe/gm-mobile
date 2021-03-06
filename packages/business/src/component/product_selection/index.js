import React, { useState } from 'react'
import classNames from 'classnames'
import { LetterIndexMultiple } from '@gm-mobile/react'
import _ from 'lodash'

import Bottom from './bottom'
import SelectedList from './selected_list'
import { PropTypes } from 'mobx-react'

export const ProductSelection = ({
  data,
  selected,
  onSelect,
  onConfirm,
  className,
  style,
  ...rest
}) => {
  const _selected = selected || []
  const [isPopup, setIsPopup] = useState(false)
  const [selectedItem, setSelectedItem] = useState(_selected)

  const handleSelect = (selected) => {
    setSelectedItem(selected)
    onSelect(selected)
  }

  const handleConfirm = () => {
    if (isPopup) {
      setIsPopup(false)
    }
    onConfirm(selectedItem)
  }

  const handleSelectedShow = () => {
    if (isPopup) {
      setIsPopup(false)
      return
    }

    setIsPopup(true)
  }

  const list = _.filter(
    data,
    (d) => _.findIndex(selectedItem, (s) => s === d.value) !== -1
  )

  return (
    <div
      className={classNames('m-letter-multiple-list', classNames)}
      style={style}
    >
      <LetterIndexMultiple
        {...rest}
        data={data}
        selected={selectedItem}
        onSelect={handleSelect}
        className='m-letter-multiple-list-content'
      />
      <Bottom
        selected={selectedItem}
        onSelectedShow={handleSelectedShow}
        onConfirm={handleConfirm}
      />
      {isPopup && (
        <SelectedList
          list={list}
          onSelect={handleSelect}
          onClose={() => setIsPopup(false)}
        />
      )}
    </div>
  )
}

ProductSelection.propTypes = {
  ...LetterIndexMultiple.propTypes,
  onConfirm: PropTypes.func,
}

export default ProductSelection
