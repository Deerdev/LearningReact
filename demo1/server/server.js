const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const model = require('./model')
const Chat = model.getModel('chat')

const userRouter = require('./user')
// socket.io work with express
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

//监听connection事件
io.on('connection', function(socket){ //io全局的请求
	console.log("io connect")
    socket.on('sendMsg', function(data){ //socket当前连接的请求
        console.log(data)
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({chatid, from, to, content:msg}, function(err, doc){ //数据库存入数据
             io.emit('recMsg', Object.assign({}, doc._doc))
        })
    })
})
//开启中间件
// 解析cookie
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
//改app.listen 为server.listen：使socket.io 与express成功绑定
server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



