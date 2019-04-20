
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatuser } from './redux/chatuser.redux'
// import {ChatReducer} from './redux/chat/reducer'
import { chat } from './redux/chat/reducer'

export default combineReducers({user,chatuser, chat})

