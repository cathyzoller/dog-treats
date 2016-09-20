import { MockList } from 'graphql-tools';
import casual from 'casual';

const mocks = {
  Int: () => casual.integer(1,1000),
  allOwners: () => ({
    owners: () => new MockList([1,10])
  }),
  Owner: () => ({
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
    dogs: () => new MockList([1,3])
  }),
  Dog: () => ({
    name: () => casual.word,
    treats: () => new MockList([1,6], () => casual.word)
  }),
  RootQuery: () => ({
    owner: (o, args) => {
      if (casual.integer(1,10) > 8){
        return null;
      }
      return { ...args };
    },
  }),
};

export default mocks
