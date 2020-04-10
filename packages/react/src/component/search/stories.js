import React from 'react'
import Search from './search'
import SearchPage from './page'
import FakeSearch from './fake_search'
import Header from '../header'
import { observable } from 'mobx'

const store = observable({
  value: '',
  searchValue: '', // 搜索结果用的值
  active: false,
  setValue(value) {
    this.value = value
  },
})

export const normal = () => {
  return (
    <div>
      <h3>带搜索按钮 （一般一个路由承载的搜索页）</h3>
      <div className='m-bg-back m-padding-8'>
        <Search
          placeholder='在站内搜索'
          value={store.value}
          onChange={(value) => store.setValue(value)}
          onSearch={() => console.log('搜索拉')}
        />
      </div>
    </div>
  )
}

export const cancel = () => {
  return (
    <div>
      <h3>带取消按钮（点Header的搜索按钮）</h3>
      <Search
        placeholder='在站内搜索'
        value={this.state.value}
        onChange={(value) => this.setState({ value })}
        onSearch={() => console.log('搜索拉')}
      />
    </div>
  )
}

export const fakeSearch = () => {
  return (
    <div>
      <h3>FakeSearch 作为搜索入口</h3>
      <FakeSearch
        placeholder='站内搜索'
        className='text-center'
        onClick={() => {}}
      />
      <FakeSearch center />
      <FakeSearch light placeholder='' />
    </div>
  )
}

// export const searchPage = () => {
//   return (
//     <SearchPage
//       header={
//         <Header
//           title='demo'
//           right={<i className='weui-icon-search text-16 padding-lr-4 text' />}
//           onClick={() => {
//             // 同时初始化下搜索数据
//             this.setState({
//               active: true,
//               value: '',
//               searchValue: '',
//             })
//
//             // 也有可能仅仅 active，搜索数据用之前的
//             // this.setState({
//             //   active: true,
//             // })
//           }}
//         />
//       }
//       active={this.state.active}
//       value={this.state.value}
//       onChange={(value) => this.setState({ value })}
//       onSearch={() => {
//         console.log('搜索拉')
//         this.setState({
//           searchValue: this.state.value,
//         })
//       }}
//       onCancel={() => {
//         console.log(this.state.searchValue)
//         this.setState({
//           active: false,
//           value: this.state.searchValue,
//         })
//       }}
//     >
//       <div>
//         输入框值:{this.state.value}
//         <br />
//         搜索值:{this.state.searchValue}
//         <br />
//         历史搜索:
//         <button
//           onClick={() => {
//             this.setState({
//               active: true,
//               value: '青菜',
//               searchValue: '青菜',
//             })
//           }}
//         >
//           青菜
//         </button>
//         <button
//           onClick={() => {
//             this.setState({
//               active: true,
//               value: '黄瓜',
//               searchValue: '黄瓜',
//             })
//           }}
//         >
//           黄瓜
//         </button>
//       </div>
//       <hr />
//       <SearchWrap />
//     </SearchPage>
//   )
// }

export default {
  title: 'Search',
}
