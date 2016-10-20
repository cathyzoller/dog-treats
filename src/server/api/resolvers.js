// import { FavoriteTreats, FortuneCookie } from './sql/connector';

// export const schema = `
//   type Count {
//     amount: Int!
//   }
//   type FortuneCookie {
//     message: String
//   }
//   type AllTreats {
//     allTreats: [Treat]
//   }
//   type Treat {
//     id: Int!
//     name: String
//     allTreats: AllTreats
//   }
// `

// export const resolvers = {
//   Count: {
//     amount: (count) => count
//   },
//   AllTreats: {
//     allTreats: () => FavoriteTreats.getAll()
//   },
//   FortuneCookie: {
//     message:() => FortuneCookie.getOne()
//   }
// }

//export const resolvers = {
  //RootQuery: {
    // owner(_, { firstName, lastName }){
    //   const type = 'Owner';
    //   return Owner.find({ where: { first_name, last_name, type } });
    // },
    // walker(_, { firstName, lastName }){
    //   const type = 'Walker';
    //   return Walker.find({ where: { first_name, last_name, type } });
    // },

  // RootMutation: {
  //   createOwner: (root, args) => { return Owner.create(args); },
  //   createWalker: (root, args) => { return Walker.create(args); },
  //   createDog: (root, { ownerId, walkerId, name, treats }) => {
  //     return Owner.findOne({ where: { id: ownerId } }).then( (owner) => {
  //       return owner.createDog( { treats: treats.join(','), name });
  //     });
  //   }
  // },
  // Owner: {
  //   dogs(owner){
  //     return owner.getDogs();
  //   }
  // },
  // Walker: {
  //   dogs(owner){
  //     return walker.getDogs();
  //   }
  // },
  // Dog: {
  //   owner(dog){
  //     return dog.getOwner();
  //   },
  //   walker(dog){
  //     return dog.getWalker();
  //   },
  //   name(dog){
  //     return dog.name;
  //   },
  //   treats(dog){
  //     return dog.treats.split(',');
  //   }
  // }
// }

// export default resolverFunctions;
