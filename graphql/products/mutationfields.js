const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

var { productType } = require('./inputtype')
var products = require('../../data')

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
    products.push({
      name: args.name,
      price: args.price,
      category: args.category
    })
    return products
  }
}

const deleteProduct = {
  type: new GraphQLList(productType),
  args: {
    name: {
      type: GraphQLString
    }
  },
  resolve: function(_, args) {
    return products.filter(function(product){
      return product.name != args.name
    })
  }
}

module.exports = {
  addProduct,
  deleteProduct
}
