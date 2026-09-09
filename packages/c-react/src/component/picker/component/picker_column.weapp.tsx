import React, { Component } from 'react'
import _ from 'lodash'
import { View, CommonEvent, ITouchEvent } from '@tarojs/components'

import { Option, PickerColumnProps, PickerColumnState } from './types'

class PickerColumn extends Component<PickerColumnProps, PickerColumnState> {
  handleOptionSelected = (newOption: Option) => {
    this.props.onChange(this.props.index, newOption)
  }

  computeTranslate = (props: PickerColumnProps) => {
    const { options, value, itemHeight, columnHeight } = props
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

    return {
      scrollerTranslate:
        columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2,
    }
  }

  // getDerivedStateFromProps 必须是纯函数；value 不在 options 中时的自动选中
  // 属于渲染期副作用（React 18 不支持），不再触发，仅回退到第 0 项位置
  static computeTranslateState(props: PickerColumnProps) {
    const { options, value, itemHeight, columnHeight } = props
    const selectedIndex = Math.max(
      0,
      _.findIndex(options, (option) => option.value === value)
    )
    return {
      scrollerTranslate:
        columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate:
        columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2,
    }
  }

  static getDerivedStateFromProps(
    nextProps: PickerColumnProps,
    state: PickerColumnState
  ) {
    if (state.isMoving) {
      return null
    }
    return PickerColumn.computeTranslateState(nextProps)
  }

  private _handleTouchStart = (event: CommonEvent) => {
    const startTouchY = (event as ITouchEvent).touches[0].pageY
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate,
    }))
  }

  private _handleTouchMove = (event: CommonEvent) => {
    event.preventDefault()

    const touchY = (event as ITouchEvent).touches[0].pageY
    this.setState((prevState: PickerColumnState) => {
      if (!prevState.isMoving) {
        return {
          isMoving: true,
          scrollerTranslate: prevState.scrollerTranslate,
        }
      }

      let nextScrollerTranslate =
        prevState.startScrollerTranslate + touchY - prevState.startTouchY
      if (nextScrollerTranslate < prevState.minTranslate) {
        nextScrollerTranslate =
          prevState.minTranslate -
          Math.pow(prevState.minTranslate - nextScrollerTranslate, 0.8)
      } else if (nextScrollerTranslate > prevState.maxTranslate) {
        nextScrollerTranslate =
          prevState.maxTranslate +
          Math.pow(nextScrollerTranslate - prevState.maxTranslate, 0.8)
      }
      return {
        isMoving: prevState.isMoving,
        scrollerTranslate: nextScrollerTranslate,
      }
    })
  }

  private _handleTouchEnd = () => {
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

  private _handleTouchCancel = () => {
    if (!this.state.isMoving) {
      return
    }
    this.setState((prevState: PickerColumnState) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: prevState.startScrollerTranslate,
    }))
  }

  handleOptionClick = (option: Option) => {
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
    const style: any = {
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
          onTouchStart={this._handleTouchStart}
          onTouchMove={this._handleTouchMove}
          onTouchEnd={this._handleTouchEnd}
          onTouchCancel={this._handleTouchCancel}
        >
          {this.renderOptions()}
        </View>
      </View>
    )
  }
}

export default PickerColumn
