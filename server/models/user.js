const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Message'
    }
  ]
})

const User = mongoose.model('User', userSchema)

module.exports = User
