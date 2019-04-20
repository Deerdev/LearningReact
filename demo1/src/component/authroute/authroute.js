import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'


// 获取用户信息；判断是否登录
// 只有代码逻辑（拆分代码逻辑）

@withRouter    // 可以在this.props中访问router的 location 和 history
@connect(
	null,
	{loadData}
)
class AuthRoute extends React.Component{
	componentDidMount() {
		const publicList = ['/login','/register']
		const pathname = this.props.location.pathname
		// 已经是登录注册页，返回
		if (publicList.indexOf(pathname)>-1) {
			return null
		}
		// 获取用户信息
		axios.get('/user/info')
			.then(res=>{
				if (res.status===200) {
					if (res.data.code===0) {
						// 有登录信息，写入到redux中
						this.props.loadData(res.data.data)
					}else{
						this.props.history.push('/login')
					}
				}
			})
		// 是否登录
		// 现在的url地址  login是不需要跳转的

		// 用户的type 身份是boss还是牛人
		// 用户是否完善信息（选择头像 个人简介）
	}
	render(){
		return null
	}

}
export default AuthRoute