const { Products } = require('../../db/setup')

const getProducts = (callback) => {
  Products.find((err, result) => {
    if (err) throw err
    else callback(result)
  })
}

const getProductByPrice = (price, callback) => {
  Products.find({ price: { $lt: price }}, (err, result) => {
    if (err) throw err
    else callback(result)
  })
}

const createProduct = (args, callback) => {
  const { name, price, category } = args
  const product = new Products({
    name, price, category
  })
  product.save((err, result) => {
    if (err) callback(err)
    else callback(result)
  })
}

const deleteProduct = (productId, callback) => {
  Products.findOneAndRemove({ _id: productId }, (err, result) => {
    if (err) callback(err)
    else callback(result)
  })
}

module.exports = {
  getProducts,
  getProductByPrice,
  createProduct,
  deleteProduct,
}
