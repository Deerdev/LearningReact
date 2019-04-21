import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './container/login/login'
import Register from './container/register/register'
import Dashboard from './component/dashboard/dashboard'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Chat from './component/chat/chat'
import AuthRoute from './component/authroute/authroute'

// 抽离出来可供服务端引入便于实现服务端渲染

class AppCommon extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            hasError: false
        }
    }
    // 全局出错逻辑处理
    componentDidCatch(err, info){
        this.setState({
            hasError: true
        })
    }

    render() {
        return this.state.hasError ? (<div><h2>页面出错了</h2><img src={require('./job.png')}></img></div>): (
            <div>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path='/bossinfo' component={BossInfo}></Route>
                <Route path='/geniusinfo' component={GeniusInfo}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route path='/chat/:user' component={Chat}></Route>
                {/* "404页面" 配置所有的router */}
                <Route component={Dashboard}></Route>
            </Switch>
        </div>
        )
    }
}
export default AppCommon