import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

class PickerColumn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props),
    }
    this.divRef = React.createRef()
  }

  // componentDidMount() {
  //   ReactDOM.findDOMNode(this.refScroll).addEventListener(
  //     'touchmove',
  //     this.handleTouchMove
  //   )
  // }

  // componentWillUnmount() {
  //   ReactDOM.findDOMNode(this.refScroll).removeEventListener(
  //     'touchmove',
  //     this.handleTouchMove
  //   )
  // }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return
    }
    this.setState(this.computeTranslate(nextProps))
  }

  computeTranslate = (props) => {
    const { options, value, columnHeight } = props
    let selectedIndex = _.findIndex(options, (option) => option.value === value)
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
    // 获取到当前元素的高度
    const itemHeight =
      this.divRef?.current?.childNodes?.[selectedIndex]?.clientHeight ?? 40
    let addHeight = 40
    // 计算translate3d要移动的距离
    for (let i = 0; i < selectedIndex; i++) {
      addHeight += this.divRef?.current?.childNodes?.[i]?.clientHeight ?? 40
    }
    return {
      scrollerTranslate: columnHeight / 2 - itemHeight / 2 - addHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2,
    }
  }

  handleOptionSelected = (newOption) => {
    this.props.onChange(this.props.index, newOption)
  }

  handleTouchStart = (event) => {
    const startTouchY = event.targetTouches[0].pageY
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate,
    }))
  }

  handleTouchMove = (event) => {
    event.preventDefault()

    const touchY = event.targetTouches[0].pageY
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
        minHeight: itemHeight + 'px',
        // height: itemHeight + 'px',
        // lineHeight: itemHeight + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
      const className = `m-picker-item${
        option.value === value
          ? ' m-picker-highlight m-picker-item-selected m-border-1px-top-before m-border-1px-bottom-after'
          : ''
      }`
      return (
        <div
          key={index}
          className={className}
          style={style}
          onClick={() => this.handleOptionClick(option)}
        >
          {renderOption(this.props.index, option)}
        </div>
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
      <div className='m-picker-column'>
        <div
          // ref={(ref) => (this.refScroll = ref)}
          ref={this.divRef}
          className='m-picker-scroll'
          style={style}
          onTouchStart={this.handleTouchStart}
          // onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}
        >
          {this.renderOptions()}
        </div>
      </div>
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
