import React from 'react'
import PropTypes from 'prop-types'
import findIndex from 'lodash/findIndex'
import View from '../../view'

class PickerColumn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return
    }
    this.setState(this.computeTranslate(nextProps))
  }

  computeTranslate = (props) => {
    const { options, value, itemHeight, columnHeight } = props
    let selectedIndex = findIndex(options, (option) => option.value === value)
    if (selectedIndex < 0) {
      // throw new ReferenceError();
      console.warn(
        'Warning: "' +
          this.props.index +
          '" doesn\'t contain an option of "' +
          value +
          '".'
      )
      this.handleOptionSelected(options[0])
      selectedIndex = 0
    }

    return {
      scrollerTranslate:
        columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2,
    }
  }

  handleOptionSelected = (newOption) => {
    this.props.onChange(this.props.index, newOption)
  }

  handleTouchStart = (event) => {
    const startTouchY = event.changedTouches[0].pageY
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate,
    }))
  }

  handleTouchMove = (event) => {
    event.preventDefault()

    const touchY = event.changedTouches[0].pageY
    this.setState(
      ({
        isMoving,
        startTouchY,
        startScrollerTranslate,
        minTranslate,
        maxTranslate,
      }) => {
        if (!isMoving) {
          return {
            isMoving: true,
          }
        }

        let nextScrollerTranslate =
          startScrollerTranslate + touchY - startTouchY
        if (nextScrollerTranslate < minTranslate) {
          nextScrollerTranslate =
            minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8)
        } else if (nextScrollerTranslate > maxTranslate) {
          nextScrollerTranslate =
            maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8)
        }
        return {
          scrollerTranslate: nextScrollerTranslate,
        }
      }
    )
  }

  handleTouchEnd = () => {
    if (!this.state.isMoving) {
      return
    }

    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
    })
    setTimeout(() => {
      const { options, itemHeight } = this.props
      const { scrollerTranslate, minTranslate, maxTranslate } = this.state
      let activeIndex
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1
      } else {
        activeIndex = -Math.floor(
          (scrollerTranslate - maxTranslate) / itemHeight
        )
      }
      this.handleOptionSelected(options[activeIndex])
    }, 0)
  }

  handleTouchCancel = () => {
    if (!this.state.isMoving) {
      return
    }
    this.setState((startScrollerTranslate) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate,
    }))
  }

  handleOptionClick = (option) => {
    this.handleOptionSelected(option)
  }

  renderOptions() {
    const { options, renderOption, itemHeight, value } = this.props
    return options.map((option, index) => {
      const style = {
        height: itemHeight + 'px',
        lineHeight: itemHeight + 'px',
      }
      const className = `m-picker-item${
        option.value === value ? ' m-picker-item-selected' : ''
      }`
      return (
        <View
          key={index}
          className={className}
          style={style}
          onClick={() => this.handleOptionClick(option)}
        >
          {renderOption(this.props.index, option)}
        </View>
      )
    })
  }

  render() {
    const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`
    const style = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString,
    }
    if (this.state.isMoving) {
      style.transitionDuration = '0ms'
    }
    return (
      <View className='m-picker-column'>
        <View
          className='m-picker-scroll'
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          {this.renderOptions()}
        </View>
      </View>
    )
  }
}

PickerColumn.propTypes = {
  options: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.any.isRequired,
  itemHeight: PropTypes.number.isRequired,
  columnHeight: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderOption: PropTypes.func.isRequired,
}

export default PickerColumn
