import { schema as countSchema, resolvers as countResolvers } from './count'
import Data from './data'

const rootSchema = `
  type allOwners {
    owners: [Owner]
  }

  type Owner {
    id: Int! # the ! means that every owner object _must_ have an id
    firstName: String
    lastName: String
    allOwners: allOwners
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
  }

  type RootQuery {
    count: Count
    allOwners: allOwners
    owner: Owner
    dog: Dog
  }

  type RootMutation {
    addCount(amount: Int!): Count
    induceError: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

const rootResolvers = {
  RootQuery: {
    count: () => Data.count
  },
  RootMutation: {
    addCount(_, { amount }) {
      Data.count += amount
      return Data.count
    },
    induceError() {
      throw new Error('Error message')
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
