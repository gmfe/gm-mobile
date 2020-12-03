import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { Flex } from '@gm-mobile/c-react'

const letterList = _.map(_.range(65, 91), (v) => String.fromCharCode(v))
letterList.push('#')

const Letter = ({ onChange }) => {
  const refLetter = useRef(null)
  const [letter, setLetter] = useState(null)
  const [showLetter, setShowLetter] = useState(false)
  const [letterInfo, setLetterInfo] = useState(null)

  useEffect(() => {
    const rect = ReactDOM.findDOMNode(refLetter.current).getBoundingClientRect()
    setLetterInfo({ top: rect.top, itemHeight: rect.height / 27 }) // 总共有 27 个符号
  }, [])

  const getY = (event) => {
    return event.touches !== undefined ? event.touches[0].pageY : event.clientY
  }

  const doChange = _.throttle((letter) => {
    onChange(letter)
  }, 100)

  const handleTouch = (e) => {
    const top = getY(e)
    let code = parseInt((top - letterInfo.top) / letterInfo.itemHeight, 10) + 65
    if (code < 65) {
      // 把滑动是能够出现的字母限定在26个大写字母和特殊符号#
      code = 65
    }
    const letter = String.fromCharCode(code >= 91 ? 35 : code) // 字母以外用 #:35

    setLetter(letter)
    doChange(letter)
  }

  const handleTouchStart = (e) => {
    handleTouch(e)
    setShowLetter(true)
  }

  const handleTouchEnd = () => {
    setShowLetter(false)
  }

  const handleTouchCancel = () => {
    setShowLetter(false)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
  }

  return (
    <div className='m-letter'>
      <Flex
        ref={refLetter}
        column
        justifyCenter
        className='m-letter-list'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onContextMenu={handleContextMenu}
      >
        {_.map(letterList, (v) => (
          <Flex key={v} flex justifyCenter alignCenter>
            {v}
          </Flex>
        ))}
      </Flex>
      {showLetter && (
        <Flex alignCenter justifyCenter className='m-letter-item'>
          {letter}
        </Flex>
      )}
    </div>
  )
}

Letter.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default Letter
