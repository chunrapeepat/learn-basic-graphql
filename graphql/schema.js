const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

var { getProducts, getProductByPrice } = require('./products/queryfields')
var { addProduct, deleteProduct } = require('./products/mutationfields')

const queryType = new GraphQLObjectType({
  name: 'queryProduct',
  description: 'Query of The product',
  fields: () => ({
    getProducts,
    getProductByPrice
  })
})

const mutationType = new GraphQLObjectType({
  name: 'mutationProduct',
  description: 'mutation of product',
  fields: () => ({
    addProduct,
    deleteProduct
  })
})

const MyGraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

module.exports = MyGraphQLSchema
