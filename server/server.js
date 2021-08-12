const http = require('http')
const SocketServer = require('socket.io')
const app = require('./app.js')
const { Message } = require('./models')
const { PORT, SOCKET_EVENTS } = require('./configs')

const server = http.createServer(app)

const cors = {
  origin: '*'
}

const io = SocketServer(server, cors)

io.on('connection', socket => {
  console.log('connection to socket')

  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async newMessage => {
    try {
      console.log(newMessage)
      const savedMessage = await Message.create(newMessage)
      io.emit(SOCKET_EVENTS.NEW_MESSAGE, savedMessage)
    } catch (error) {
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error)
    }
  })

  socket.on('disconnect', reason => {
    console.log(reason)
  })
})

server.listen(PORT, () => console.log('I am alive!'))
