/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from "react-redux"
import {onGetMsgList, onSendMsg, onReadMsg, onRecMsg} from '../../redux/chat/action'
import {getChatId} from '../../util'

@connect (
    state=>state,
    {onGetMsgList, onSendMsg, onReadMsg, onRecMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={text: '', msg:[]}
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.onGetMsgList()
            // 监听socket
            this.props.onRecMsg()
        }     
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    componentWillUnmount(){
        const to = this.props.match.params.user
        this.props.onReadMsg(to)
    }
    //grid bug官方推荐解决方案：手动发送一个事件
    fixCarousel(){
        setTimeout(function(){ 
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit(){
        // socket.emit('sendmsg',{text: this.state.text})  //触发事件
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        console.log(from, to, msg)
        this.props.onSendMsg({from, to, msg})
        this.setState({
            text: '',
            showEmoji: false
        })
    }
    render(){
        const emoji = '😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😐 😒 😓 😔 😖 😘 😚 😜 😝 😞 😠 😡 😢 😣 😤 😥 😨 😩 😪 😫 😭 😰 😱 😲 😳 😵 😶 😷 😸 😹 😺 😻 😼 😽 😾 😿 🙀 🙅 🙆 🙇 🙈 🙉 🙊 🙋 🙌 🙍 🙎 🙏 🚀 🚃 🚄 🚅 🚇 🚉 🚌 🚏 🚑 🚒 🚓 🚕 🚗 🚙 🚚 🚢 🚤 🚥 🚧 🚨 🚩 🚪 🚫 🚬 🚭 🚲 🚶 🚹 🚺 🚻 🚼 🚽 🚾 🛀 '.split(" ").filter(v=>v).map(v=>({text:v}));

        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        // console.log(users, userid)
        if(!users[userid]){
            return null
        }
        
        //过滤聊天信息：只显示与当前选择用户的信息
        const chatid = getChatId(userid, this.props.user._id)
        
        const chatmsgs = this.props.chat.chatmsg.filter(v=>getChatId(v.from, v.to)===chatid)

        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {chatmsgs.map(v=>{
                    const avatar = require(`../img/${users[v.from].avatar}.png`)
                    return v.from == userid ? (
                       <List key={v._id}>
                           <Item
                             thumb={avatar}
                           >{v.content}</Item>
                       </List>
                    ) : (
                       <List key={v._id}>
                           <Item 
                              extra={<img src={avatar} alt="头像"/>}
                              className='chat-me'
                            >{v.content}</Item>
                       </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem 
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v =>{
                                this.setState({
                                    text:v
                                })
                            }}
                            extra={
                                <div>
                                    <span style={{marginRight:15}}
                                       onClick={()=>{
                                           this.setState({
                                               showEmoji: !this.state.showEmoji
                                           })
                                           this.fixCarousel()
                                       }}
                                    >😃</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }
                        >信息</InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text: this.state.text+el.text
                            })
                        }}
                    /> : null} 
                </div>
            </div>
        )
    }
}

export default Chat