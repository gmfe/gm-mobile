import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import PropTypes from 'prop-types'
import { Page, Flex, Button } from '@gm-mobile/react'

const View = ({ disabledEdit, onClick, image }) => {
  return (
    <Page
      white
      bottom={
        !disabledEdit && (
          <Flex alignCenter justifyCenter className='m-padding-10'>
            <Button block type='primary' onClick={onClick}>
              {getLocale('修改签名')}
            </Button>
          </Flex>
        )
      }
    >
      <div style={{ fontSize: 0 }}>
        <img width='100%' src={image} />
      </div>
    </Page>
  )
}

View.propTypes = {
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabledEdit: PropTypes.bool,
}

export default View
