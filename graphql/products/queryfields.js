const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

const { productType } = require('./inputtype')
const productServices = require('./services')

const getProducts = {
  type: new GraphQLList(productType),
  resolve: function(_, args) {
    return new Promise((resolve, reject) => {
      productServices.getProducts((data) => {
        resolve(data)
      })
    })
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
    return new Promise((resolve, reject) => {
      productServices.getProductByPrice(args.price, (data) => {
        resolve(data)
      })
    })
  }
}

module.exports = {
  getProducts,
  getProductByPrice
}
