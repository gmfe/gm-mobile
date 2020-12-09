import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'
import View from '../view'
import Button from '../button'
import emptyImg from './empty.png'

const Status = React.memo(
  ({ type, tip, onReload, className, children, ...rest }) => {
    let content = null
    if (type === 'loading') {
      content = <View className='m-text-center'>{tip || '正在加载...'}</View>
    } else if (type === 'error') {
      content = (
        <View className='m-text-center'>
          <View>加载失败！</View>
          <View>
            <Button
              mini
              type='primary'
              onClick={() => {
                onReload()
              }}
            >
              重新加载
            </Button>
          </View>
        </View>
      )
    } else if (type === 'empty') {
      content = (
        <View
          style={{
            width: '100px',
            height: '120px',
            backgroundImage: `url(${emptyImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        />
      )
    }
    return (
      <Flex
        column
        alignCenter
        {...rest}
        className={classNames('m-status', className)}
      >
        {content}
        {children}
      </Flex>
    )
  }
)

Status.propTypes = {
  type: PropTypes.oneOf(['loading', 'error', 'empty']),
  tip: PropTypes.string,
  /** type === error 有效 */
  onReload: PropTypes.func,
  className: PropTypes.string,
}

export default Status
