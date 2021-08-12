const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
    min: 1,
    max: 1024
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
