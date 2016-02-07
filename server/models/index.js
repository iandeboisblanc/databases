// var db = require('../db');
// var con = db.connection;


var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'p');

var User = db.define('users', {
  Name: Sequelize.STRING,
  ID: {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true}
});

var Message = db.define('messages', {
  UserID: Sequelize.INTEGER,
  Content: Sequelize.STRING,
  Room: Sequelize.STRING,
  ID: {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true}
});


User.sync().then(function() {
  console.log('Successfullly synced user model');
});

Message.sync().then(function() {
  console.log('Successfullly synced message model');
});

User.hasMany(Message, {foreignKey: 'UserID'});
Message.belongsTo(User);

module.exports = {
  messages: {
    get: function (callback) {
      Message.findAll({include:[User]})
        .then(function(messages) {
          // console.log('messages:',messages)
          callback(null, messages);
        })
        .catch(function(err) {
          callback(err, null);
        });
    },
    post: function (message, callback) {
      // console.log(message);
      var username = message.username;
      var roomname = message.roomname;
      var content = message.text;
      User.findAll({where:{Name:username}})
        .then(function(userResults) {
          Message.upsert({
            Content:content,
            UserID:userResults[0].dataValues.ID,
            Room:roomname
          })
          .then(function(data) {
            callback(null, data);
          })
          .catch(function(err) {
            callback(err, null);
          });
      });
    }
  },

  users: {
    get: function (callback) {
      User.findAll()
        .then(function(data) {
          callback(null,data);
        })
        .catch(function(err) {
          callback(err, null);
        });
    },
    post: function (user, callback) {
      var username = user.username;
      User.upsert({Name:username})
        .then(function(data) {
          callback(null, data);
        })
        .catch(function(err) {
          callback(err, null);
        });
    }
  }
};