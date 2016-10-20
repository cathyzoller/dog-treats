import { schema as countSchema, resolvers as countResolvers } from './count'
//import { schema as apiSchema, resolvers as apiResolvers } from './restApis'
import Data from './data'
import { FavoriteTreats, FortuneCookie } from './sql/connector';

const rootSchema = `
  type AllOwners {
    owners: [Owner]
  }

  type AllWalkers {
    walkers: [Walker]
  }

  type Owner {
    id: Int! # the ! means that every owner object _must_ have an id
    firstName: String
    lastName: String
    allOwners: AllOwners
    dogs: [Dog]
  }

  type Walker {
    id: Int!
    firstName: String
    lastName: String
    allWalkers: AllWalkers
  }

  type Dog {
    id: Int!
    name: String
    owner: Owner
  }

  type AllTreats {
    treats: [Treat]
  }

  type Treat {
    name: String!
  }

  type RootQuery {
    count: Count
    favoriteTreats: AllTreats
    allTreats: AllTreats
    allOwners: AllOwners
    allWalkers: AllWalkers
    owner: Owner
    walker: Walker
    dog: Dog
    fortuneCookie: String
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
    count() { return Data.count },
    favoriteTreats() {
      return FavoriteTreats.getAll();
    },
    allTreats() {
      return Data.allTreats;
    },
    fortuneCookie() {
      return FortuneCookie.getOne();
    }
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
