import {
  GET_MSGLIST_SUCCESS,
  REC_MSG_SUCCESS,
  UPDATE_MSG_SUCCESS,
  MSG_READ
} from './actionType';

const initialState = {
  chatmsg: [],
  users: {},
  unread: 0
};

export const chat = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case GET_MSGLIST_SUCCESS:
      return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>!v.read && v.to===action.payload.userid).length};
    case REC_MSG_SUCCESS:
      const n = action.payload.to===action.userid ? 1 : 0
      return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+n}
    case UPDATE_MSG_SUCCESS:
      return {
        chatmsg: state.chatmsg.map(item => {
          if (item.from === action.from && item.to === action.to) {
            item.read = true;
          }
          return item;
        })
      };
    case MSG_READ:
      const {from, num} = action.payload
      return {...state, chatmsg:state.chatmsg.map(v=>({...v, read:from===v.from?true:v.read})) , unread:state.unread-num}
    default:
      return state;
  }
};
