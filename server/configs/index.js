const {
  env: { PORT }
} = process

module.exports = {
  PORT: PORT || 5000,
  db: {
    development: {
      hostName: 'localhost',
      port: 27017,
      dbName: 'fmChat'
    }
  },
  SOCKET_EVENTS: {
    NEW_MESSAGE: 'NEW_MESSAGE',
    NEW_MESSAGE_ERROR: 'NEW_MESSAGE_ERROR'
  }
}
