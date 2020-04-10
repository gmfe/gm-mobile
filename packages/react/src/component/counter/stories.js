// import React from 'react'
// import { observable } from 'mobx'
//
// import Counter from './'
//
// const store = {
//   amount: 9,
//   maxAmount: 12,
//   setValue(value) {
//     this.amount = value
//   },
// }
// const store1 = observable(store)
// const store2 = observable(store)
//
// export const Normal = () => {
//   const handleCountNumEdit = (amount) => {
//     const { maxAmount } = store1
//
//     if (amount > maxAmount) {
//       amount = maxAmount
//     }
//
//     store1.setValue(amount)
//   }
//
//   return (
//     <Counter
//       key='counter'
//       onCountMinus={amount => store1.setValue(amount)}
//       onCountPlus={amount => store1.setValue(amount)}
//       onCountNumEdit={handleCountNumEdit}
//       onCountInputBlur={amount => store1.setValue(amount)}
//       amount={store1.amount}
//     />
//   )
// }
//
// export const MinAndMax = () => {
//   const handleCountNumEdit = (amount) => {
//     const { maxAmount } = store2
//
//     if (amount > maxAmount) {
//       amount = maxAmount
//     }
//
//     store2.setValue(amount)
//   }
//
//   const { amount, maxAmount } = store2
//   const plusDisabled = amount >= maxAmount
//
//   return (
//     <Counter
//       key='counter'
//       onCountMinus={amount => store2.setValue(amount)}
//       onCountPlus={amount => store2.setValue(amount)}
//       onCountNumEdit={handleCountNumEdit}
//       onCountInputBlur={amount => store2.setValue(amount)}
//       amount={amount}
//       isPlusDisabled={plusDisabled}
//       // min={store2.minAmount}
//       // max={store2.maxAmount}
//     />
//   )
// }
//
// export default {
//   title: 'Counter',
// }
