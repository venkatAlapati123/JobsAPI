const mongoose = require('mongoose')

const connectDB = (url) => {
  console.log('connected')
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
}

module.exports = connectDB
