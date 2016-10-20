import 'babel-polyfill'
import bodyParser from 'body-parser'
import express from 'express'
import log from '../log'
import appRenderer from './middleware/app-renderer'
import { apolloExpress, graphiqlExpress } from 'apollo-server'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { schema, resolvers } from './api/schema'
import mocks from './api/mocks'
require('dotenv').load({ path: '.env' })

// process.on('uncaughtException', (ex) => {
//   log.error(ex)
//   process.exit(1)
// })

const app = express()
// Heroku requires you to use process.env.PORT
const port = process.env.PORT || 8080

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
  allowUndefinedInResolve: true, // optional
  resolverValidationOptions: {
    requireResolversForNonScalar: false
  },
  printErrors: true
  //connectors: Connectors,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: mocks,
  preserveResolvers: true,
});

// Don't rate limit heroku
app.enable('trust proxy')

// Parse bodies as JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In development, we use webpack server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }))
}

// `context` must be an object and can't be undefined when using connectors
app.use('/graphql', bodyParser.json(), apolloExpress(request => ({
  schema: executableSchema,
  context: { } //{ user: request.session.user }
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// This middleware should be last. Return the React app only if no other route is hit.
app.use(appRenderer)
app.listen(port, () => {
  //log.info(`Node app is running on port ${port}`)
  console.log(`Node app is running on port ${port}`)
})
