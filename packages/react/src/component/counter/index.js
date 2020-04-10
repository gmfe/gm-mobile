import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Big from 'big.js'

import Flex from '../flex'
import ScrollIntoView from '../scroll_into_view'
import Index from '../input/input.number'

import SVGMinusCycle from '../../../svg/minus-circle.svg'
import SVGAddCycle from '../../../svg/add-circle.svg'

class Counter extends React.Component {
  // 点减号时触发
  handleCountMinus = () => {
    const { onCountMinus, amount } = this.props

    if (amount === 0) {
      return
    }

    const amount_new = Number(
      Big(amount || 1)
        .minus(1)
        .toString()
    )
    onCountMinus(amount_new)
  }

  // 点加号时触发
  handleCountPlus = (e) => {
    const { onCountPlus, isPlusDisabled, amount } = this.props

    if (isPlusDisabled) {
      return
    }

    const amount_new = Number(
      Big(amount || 0)
        .plus(1)
        .toString()
    )
    onCountPlus(amount_new, e)
  }

  // 失焦后触发
  handleCountInputBlur = (e) => {
    const { onCountInputBlur } = this.props
    const amount = e.target.value
    onCountInputBlur(amount)
  }

  render() {
    const {
      amount,
      onCountNumEdit,
      onCountInputFocus,
      isPlusDisabled,
    } = this.props

    const minusIconClass = classNames('m-counter-minus', {
      disabled: amount === 0,
    })
    const plusIconClass = classNames('m-counter-plus', {
      disabled: isPlusDisabled,
    })
    const inputClass = classNames('m-counter-num', {
      'm-counter-num-border': amount > 0,
    })

    return (
      <Flex alignCenter className='m-counter'>
        <SVGMinusCycle
          className={minusIconClass}
          onClick={this.handleCountMinus}
        />
        <ScrollIntoView>
          <Index
            className={inputClass}
            onChange={onCountNumEdit}
            onBlur={this.handleCountInputBlur}
            onFocus={onCountInputFocus}
            value={amount || ''}
          />
        </ScrollIntoView>
        <SVGAddCycle className={plusIconClass} onClick={this.handleCountPlus} />
      </Flex>
    )
  }
}

Counter.propTypes = {
  onCountMinus: PropTypes.func.isRequired,
  onCountPlus: PropTypes.func.isRequired,
  onCountNumEdit: PropTypes.func.isRequired,
  onCountInputBlur: PropTypes.func.isRequired,
  amount: PropTypes.any.isRequired,
  onCountInputFocus: PropTypes.func,
  isPlusDisabled: PropTypes.bool,
}

export default Counter
