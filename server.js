const cors = require('cors')
const path = require('path')
const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()
const port = 3000

const MyGraphQLSchema = require('./graphql/schema')

app.use(cors())

app.use('/dist', express.static(path.join(__dirname, 'frontend', 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

app.listen(port, () => console.log(`server is running on port ${port}`))
