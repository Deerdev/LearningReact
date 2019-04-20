import { axios } from '../api';

export function getMsgList(cb) {
  const url = '/user/getmsglist';
  axios
    .get(url)
    .then(res => {
      if (res.status === 200) {
        cb(res.data);
        return;
      }
      throw new Error();
    })
    .catch(err => {
      cb({ code: 1, msg: '获取消息列表失败' });
    });
}

export function readMsg(from, cb) {
  axios.post('/user/readmsg',{from})
            .then(res=>{
              console.log(res)
              if(res.status===200&&res.data.code===0){
                cb(res.data)
              }
            })
}

