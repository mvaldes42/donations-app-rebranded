import express from 'express'
import http from 'http'
// @ts-ignore
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
// @ts-ignore
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize'
import { WebSocketServer } from 'ws'
import {
  generateModelTypes,
  generateApolloServer
} from 'graphql-sequelize-generator'
import {
  GraphqlSchemaDeclarationType,
  ListAfterHook
} from 'graphql-sequelize-generator/types'
import { PubSub } from 'graphql-subscriptions'

import models from '../models'

const types = generateModelTypes(models)

let graphqlSchemaDeclaration: GraphqlSchemaDeclarationType = {}

graphqlSchemaDeclaration.transaction = {
  model: models.transaction,
  actions: ['list', 'count'],
  subscriptions: ['create', 'update', 'delete'],
  list: {
    before: (findOptions: any) => {
      if (findOptions.where.donation.firstName) {
        findOptions.include = [
          {
            model: models.donation,
            as: 'donation',
            where: {
              firstName: findOptions.where.donation.firstName
            }
          }
        ]
        delete findOptions.where.donation
      }
      return findOptions
    }
  }
}

graphqlSchemaDeclaration.donation = {
  model: models.donation,
  actions: ['list', 'count'],
  subscriptions: ['create', 'update', 'delete']
}

const pubSubInstance = new PubSub()

const app = express()
const port = process.env.PORT || 8080
const httpServer = http.createServer({}, app)
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })

const server = generateApolloServer({
  graphqlSchemaDeclaration,
  types,
  models,
  pubSubInstance,
  wsServer,
  callWebhook: async () => undefined
})
;(async () => {
  await server.start()

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async () => {
        const dataloaderContext = createContext(models.sequelize)
        return { [EXPECTED_OPTIONS_KEY]: dataloaderContext }
      }
    })
  )

  httpServer.listen(port, () => {
    console.log(`🚀 http server ready at http://localhost:${port}/graphql`)
  })
})()
