const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()
const port = 3000

const MyGraphQLSchema = require('./graphql/schema')

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

app.listen(port, () => console.log(`server is running on port ${port}`))
