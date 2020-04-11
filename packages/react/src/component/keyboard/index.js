import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Flex from '../flex'

const Btn = (props) => {
  const { disabled, children, onClick, flex, styleType } = props
  return (
    <Flex
      flex={flex || 1}
      justifyCenter
      alignCenter
      className={classNames(
        'm-border-1px-bottom-after m-border-1px-right-before m-text-20',
        {
          'm-text-white m-bg-primary': styleType === 'primary',
        }
      )}
      style={{ opacity: disabled ? 0.7 : 1 }}
      onClick={disabled ? _.noop : onClick}
    >
      {children}
    </Flex>
  )
}

Btn.propTypes = {
  styleType: PropTypes.oneOf(['default', 'primary']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  flex: PropTypes.number,
}

const firstRow = [1, 2, 3]
const secondRow = [4, 5, 6]
const thirdRow = [7, 8, 9]

class Keyboard extends React.Component {
  handleClick = (text) => {
    const { value, onChange, onSubmit } = this.props

    if (text === 'submit') {
      onSubmit(text)
      return
    }

    if (text === 'back') {
      onChange(value.slice(0, -1))
      return
    }

    onChange(value + text)
  }

  renderBtn = (btn) => {
    if (btn) {
      return (
        <Btn styleType='primary' onClick={() => btn.onClick()}>
          {btn.text}
        </Btn>
      )
    }
    return <Btn styleType='primary' />
  }

  render() {
    const { value, btnOne, btnTwo, submitText } = this.props
    return (
      <Flex
        column
        className='m-bg-white m-border-1px-top-before'
        style={{
          width: '100vw',
          height: '80vw',
        }}
      >
        <Flex flex>
          {_.map(firstRow, (num) => (
            <Btn key={num} onClick={this.handleClick.bind(this, num)}>
              {num}
            </Btn>
          ))}
          <Btn
            styleType='primary'
            onClick={this.handleClick.bind(this, 'back')}
            disabled={!value}
          >
            {getLocale('退格')}
          </Btn>
        </Flex>
        <Flex flex>
          {_.map(secondRow, (num) => (
            <Btn key={num} onClick={this.handleClick.bind(this, num)}>
              {num}
            </Btn>
          ))}
          {this.renderBtn(btnOne)}
        </Flex>
        <Flex flex>
          {_.map(thirdRow, (num) => (
            <Btn key={num} onClick={this.handleClick.bind(this, num)}>
              {num}
            </Btn>
          ))}
          {this.renderBtn(btnTwo)}
        </Flex>
        <Flex flex>
          <Btn onClick={this.handleClick.bind(this, 0)} flex={2}>
            0
          </Btn>
          <Btn onClick={this.handleClick.bind(this, '.')}>.</Btn>
          <Btn
            styleType='primary'
            onClick={this.handleClick.bind(this, 'submit')}
          >
            {submitText}
          </Btn>
        </Flex>
      </Flex>
    )
  }
}

Keyboard.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  btnOne: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
  btnTwo: PropTypes.shape({
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
}

Keyboard.defaultProps = {
  onSubmit: _.noop,
  submitText: getLocale('完成'),
}

export default Keyboard
