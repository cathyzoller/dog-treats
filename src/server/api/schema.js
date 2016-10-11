import { schema as countSchema, resolvers as countResolvers } from './count'
import Data from './data'

const rootSchema = `
  type AllOwners {
    owners: [Owner]
  }

  type AllTreats {
    treats: [Treat]
  }

  type Owner {
    id: Int! # the ! means that every owner object _must_ have an id
    firstName: String
    lastName: String
    allOwners: AllOwners
    dogs: [Dog]
  }

  type Dog {
    id: Int!
    name: String
    treats: [Treat]
    owner: Owner
  }

  type Treat {
    id: Int!
    name: String
    allTreats: AllTreats
  }

  type RootQuery {
    count: Count
    allTreats: AllTreats
    allOwners: AllOwners
    owner: Owner
    dog: Dog
  }

  type RootMutation {
    addCount(amount: Int!): Count
    addTreat(name: String!): Treat
    induceError: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

const rootResolvers = {
  RootQuery: {
    count: () => Data.count,
    allTreats: () => Data.allTreats
  },
  RootMutation: {
    addCount(_, { amount }) {
      Data.count += amount
      return Data.count
    },
    induceError() {
      throw new Error('Error message')
    },
    addTreat(_, { name }) {
      Data.allTreats.treats.push({ name })
      return Data.allTreats
    }
  }
}

export const schema = [
  rootSchema,
  countSchema
]

export const resolvers = {
  ...rootResolvers,
  ...countResolvers
}
