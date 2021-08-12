import axios from 'axios'
import { io } from 'socket.io-client'
import store from '../store'
import * as ChatActionCreators from '../actions/chatActionCreators'
import { BASE_URL, SOCKET_EVENTS } from '../constants'

const httpClient = axios({
  baseURL: `http://${BASE_URL}`
})

const socket = io(`ws://${BASE_URL}`, { transports: ['websocket'] })

socket.on(SOCKET_EVENTS.NEW_MESSAGE, msg => {
  console.log(msg)
  store.dispatch(ChatActionCreators.createMessageSuccess(msg))
})

socket.on(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error => {
  console.log(error)
  store.dispatch(ChatActionCreators.createMessageError(error))
})

export const getMessages = () => httpClient.get('/')
export const createMessage = message =>
  socket.emit(SOCKET_EVENTS.NEW_MESSAGE, message)
