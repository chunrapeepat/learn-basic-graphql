const express = require('express')
const graphqlHTTP = require('express-graphql')
const graphql = require('graphql')

const GraphQLSchema = graphql.GraphQLSchema
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLList = graphql.GraphQLList
const GraphQLInt = graphql.GraphQLInt

const products = require('./data')

const app = express()
const port = 3000

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

const queryType = new GraphQLObjectType({
  name: 'queryProduct',
  description: 'Query of The product',
  fields: () => ({
    getProducts: {
      type: new GraphQLList(productType),
      resolve: function(_, args) {
        return products
      }
    },
    getProductByPrice: {
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
  })
})

const mutationType = new GraphQLObjectType({
  name: 'mutationProduct',
  description: 'mutation of product',
  fields: () => ({
    addProduct: {
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
  })
})

const MyGraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

app.listen(port, () => console.log(`server is running on port ${port}`))
