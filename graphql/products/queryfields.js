const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

var { productType } = require('./inputtype')
var products = require('../../data')

const getProducts = {
  type: new GraphQLList(productType),
  resolve: function(_, args) {
    return products
  }
}

const getProductByPrice = {
  type: new GraphQLList(productType),
  args: {
    price: {
      type: GraphQLInt
    }
  },
  resolve: function(_, args) {
    const filterProduct = products.filter(function(product){
      return product.price <= args.price
    })
    return filterProduct
  }
}

module.exports = {
  getProducts,
  getProductByPrice
}
