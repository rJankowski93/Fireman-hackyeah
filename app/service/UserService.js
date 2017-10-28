// // user methods like login, get data etc
// import Realm from 'realm';
// import User from '../model/User'

// let repository =  new Realm({
//     schema: [{
// 	name: 'User',
// 	primaryKey: 'id',
// 	properties: {
// 	    id: {type: 'int', indexed: true},
// 	    name: 'string',
// 	    adress: 'string',
// 	    createdAt: 'date',
// 	    updatedAt: 'date'
// 	}
//     }]
// });

// let UserService = {

//     save: function(user) {
//         if (repository.objects('User').filtered("name = '" + user.name + "'").length) return;
    
//         repository.write(() => {
//           user.updatedAt = new Date();
//           repository.create('User', user);
//         })
//       },
    
//       update: function(user, callback) {
//         if (!callback) return;
//         repository.write(() => {
//           callback();
//           user.updatedAt = new Date();
//         });
//       }
// }
// module.exports = UserService;