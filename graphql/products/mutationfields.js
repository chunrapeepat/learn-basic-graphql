const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

var { productType } = require('./inputtype')
var productServices = require('./services')

const addProduct = {
  type: new GraphQLList(productType),
  args: {
    name: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    category: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: function(_, args) {
    return new Promise((resolve, reject) => {
      productServices.createProduct(args, (data) => {
        resolve(data)
      })
    })
  }
}

const deleteProduct = {
  type: new GraphQLList(productType),
  args: {
    id: {
      type: GraphQLString
    }
  },
  resolve: function(_, args) {
    return new Promise((resolve, reject) => {
      productServices.deleteProduct(args.id, (data) => {
        resolve(data)
      })
    })
  }
}

module.exports = {
  addProduct,
  deleteProduct
}
