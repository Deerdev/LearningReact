import {
  GET_MSGLIST_SUCCESS,
  REC_MSG_SUCCESS,
  UPDATE_MSG_SUCCESS,
  MSG_READ
} from './actionType';
import { getMsgList, readMsg } from '../../api';

import io from 'socket.io-client';
const socket = io('http://localhost:9093');


export const getMsgListSuccess = (msgs, users, userid) => ({
  type: GET_MSGLIST_SUCCESS,
  payload:{msgs, users, userid}
});

export const recMsgSuccess = (msg, userid) => ({
  type: REC_MSG_SUCCESS,
  userid,
  payload:msg
});

export const updateMsgSuccess = ({from, to, num}) => ({
  type: UPDATE_MSG_SUCCESS,
  payload:{from, to, num}
});

function msgRead({from, to, num}){
  return {type:MSG_READ, payload:{from, to, num}}
}

// 异步请求接口
export const onGetMsgList = () => {
  console.log("get msg list")
  return (dispatch, getState) => {
    getMsgList(({ code, users, msgs }) => {
      if (code === 0) {
        const userid = getState().user._id
        dispatch(getMsgListSuccess(msgs, users, userid));
        return;
      }
      // 处理error
      // fail(msg, 1);
    });
  };
};

// 异步发送消息
export const onSendMsg = ({ from, to, msg }) => {
  return dispatch => {
    socket.emit('sendMsg', { from, to, msg });
  };
};

// 异步发送: 消息已读
export const onReadMsg = ({ from }) => {
  return (dispatch, getState) => {
    // socket.emit('readMsg', { from, to });
    readMsg(from, (data)=>{
      const userid = getState().user._id
      console.log("---",data)
      dispatch(msgRead({userid, from, num:data.num}))
    })
  };
};

export const onUpdateMsg = () => {
  return dispatch => {
    socket.on('updateMsg', ({ from, to }) => {
      dispatch(updateMsgSuccess(from, to));
    });
  };
};

export const onRecMsg = () => {
  // getState 可以将当前的state传进去
  //redux中使用其它地方的数据，通过getState获取全部的状态
  return (dispatch, getState) => {
    socket.on('recMsg', data => {
      console.log("recv", data)
      const _id = getState() && getState().user && getState().user._id;
      // 剔除不属于自己的消息
      console.log(data, _id)
      if (data.from === _id || data.to === _id) {
        dispatch(recMsgSuccess(data, _id));
      }
    });
  };
};
