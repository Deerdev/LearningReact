
// // 延迟添加，拖两天再给
// export function addGunAsync () {
//   // thunk插件的作用，这里可以返回函数，
//   return dispatch => {
//     setTimeout(() => {
//       // 异步结束后，手动执行dispatch
//       dispatch(addGun())
//     }, 2000)
//   }
// }

// next 即对应 dispatch
const thunk = ({ dispatch, getState }) => next => action => {
  console.log(next)
  console.log(action)
  // 是函数，就是异步的action
  if (typeof action === 'function') {
    //  如上面所示
    return action(dispatch, getState)
  }
  //  默认情况下
  return next(action)
}

export default thunk
