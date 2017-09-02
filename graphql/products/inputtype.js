const graphql = require('graphql')
const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

const voteType = new GraphQLObjectType({
  name: 'vote',
  description: 'Vote of the product',
  fields: () => ({
    star: {
      type: GraphQLInt,
      description: 'Number of stars'
    },
    men: {
      type: GraphQLInt,
      description: 'Number of men votes'
    },
    women: {
      type: GraphQLInt,
      description: 'Number of women votes'
    }
  })
})

const productType = new GraphQLObjectType({
  name: 'products',
  description: 'Detail of The product',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Name of the product'
    },
    price: {
      type: GraphQLInt,
      description: 'Price of the product'
    },
    category: {
      type: new GraphQLList(GraphQLString),
      description: 'Categories of the product'
    },
    vote: {
      type: new GraphQLList(voteType),
      description: 'Vote of the product'
    }
  })
})

module.exports = {
  productType: productType
}
