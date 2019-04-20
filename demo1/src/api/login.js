import { axios } from '../api';

// interface LoginParams {
//   user: string;
//   pwd: string;
// }

export function login(body, cb) {
  const url = '/api/user/login';
  axios
    .post(url, body)
    .then(res => {
      if (res.status === 200) {
        cb(res.data);
        return;
      }
      throw new Error();
    })
    .catch(err => {
      cb({ code: 1, msg: '登录失败' });
    });
}
