//import Sequelize from 'sequelize';
import rp from 'request-promise';

// const db = new Sequelize('dogwalker_dev', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// const User = db.define('owner', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name'
//   },
//   lastName: {
//     type: Sequelize.STRING,
//     field: 'last_name'
//   },
//   isWalker: {
//     type: Sequelize.BOOLEAN,
//     field: 'walker'
//   }
// },
// {
//   underscored: true,
//   freezeTableName: true,
//   tableName: 'users'
// });

// const Walker = User.findAndCountAll({
//   where: { isWalker: true }
// });

// const Owner = User.findAndCountAll({
//   where: { isWalker: false }
// });

// const Dog = db.define('dog', {
//   name: {
//     type: Sequelize.STRING
//   },
//   toys: {
//     type: Sequelize.STRING
//   },
//   treats: {
//     type: Sequelize.STRING
//   }
// });

// const Treat = db.define('treat', {
//   name: {
//     type: Sequelize.STRING
//   },
//   image_url: {
//     type: Sequelize.STRING
//   }
// })

export const FavoriteTreats = {
  getAll() {
    return rp('https://dogwalker2.herokuapp.com/api/dog_treats/treats')
    .then((res) => {
      console.log('result', res);
      console.log('parsed res', JSON.parse(res).allTreats.treats[0]);
      return JSON.parse(res).allTreats;
    });
  }
};

export const FortuneCookie = {
  getOne() {
    return rp('http://fortunecookieapi.com/v1/cookie')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res[0].fortune.message;
      });
  }
};
