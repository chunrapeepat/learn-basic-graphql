const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/learngraphql')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
  console.log('Database Connected!')
})

const Products = mongoose.model('products', {
  name: String,
  price: Number,
  category: Array,
  vote: Array,
})

module.exports = {
  Products
}
