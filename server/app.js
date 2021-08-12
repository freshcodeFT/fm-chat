const express = require('express')
const cors = require('cors')
const { Message } = require('./models')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', async (req, res, next) => {
  try {
    const msgs = await Message.find({}, null, {
      sort: {
        createdAt: -1,
        limit: 50
      }
    })
    res.send(msgs)
  } catch (error) {
    next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send(err) // VERY BAD error handler
})

module.exports = app
