import React from 'react'
import Image from './image'

const src =
  'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png?'
const style1 = { width: '100px', height: '200px' }
const style2 = { width: '200px', height: '100px' }
const flex = {
  width: '350px',
  display: 'flex',
  justifyContent: 'space-between',
}

export const normal = () => (
  <div>
    <Image width={100} src={src} />
  </div>
)

export const round = () => (
  <div>
    <Image round width={100} height={100} className='m-border' src={src} />
  </div>
)

export const error = () => (
  <div>
    <Image width={100} height={100} src='error' />
  </div>
)

export const objectFix = () => (
  <div>
    <h3>fill</h3>
    <div style={flex}>
      <Image src={src} style={style1} />
      <Image src={src} style={style2} />
    </div>

    <h3>Contain</h3>
    <div style={flex}>
      <Image objectFix='contain' src={src} style={style1} />
      <Image objectFix='contain' src={src} style={style2} />
    </div>

    <h3>Cover</h3>
    <div style={flex}>
      <Image objectFix='cover' src={src} style={style1} />
      <Image objectFix='cover' src={src} style={style2} />
    </div>

    <h3>None</h3>
    <div style={flex}>
      <Image objectFix='none' src={src} style={style1} />
      <Image objectFix='none' src={src} style={style2} />
    </div>

    <h3>scale-down</h3>
    <div style={flex}>
      <Image objectFix='scale-down' src={src} style={style1} />
      <Image objectFix='scale-down' src={src} style={style2} />
    </div>
  </div>
)

export default {
  title: '基础/Image',
  component: Image,
}
