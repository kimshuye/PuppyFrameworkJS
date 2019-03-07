const DbServer = {
    dev: {
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      connectionString: 'mongodb://localhost:27017/membership'
    } 
  }
  
  module.exports = {
    DbServer
  }