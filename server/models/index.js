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

module.exports = {
  messages: {
    get: function (callback) {
      Message.findAll().then(function(messages) {
        callback(messages);
      });
      // con.query(
      //   'SELECT * FROM chat.messages a JOIN chat.users b ON a.UserID = b.ID', function(err, results) {
      //     if(err) {
      //       callback(err, null);
      //     } else {
      //       console.log('Got message data!');
      //       callback(null, results);
      //     }
      //   });
    }, // a function which produces all the messages
    post: function (message, callback) {
      //open the message;
      console.log(message);
      var username = message.username;
      var roomname = message.roomname;
      var content = message.text;
      con.query(
        'SELECT id FROM chat.users WHERE name = ?', username, function(err, res){
          if(err){
            console.log("Select error:", err);
          }else{
            con.query('INSERT INTO chat.messages(content,userID,createdAt,room) values(?,?,?,?);', 
            [content, res[0].id, new Date(), roomname], function(err, result){
              if(err){
                callback(err, null);
              }else{
                callback(null, result);
              }
            });
          }
        });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      User.findAll();
      // con.query(
      //   'SELECT * FROM chat.users', function(err, results) {
      //     if(err) {
      //       callback(err, null);
      //     } else {
      //       console.log('Got user data!');
      //       callback(null, results);
      //     }
      //   });
    },
    post: function (user, callback) {
      var username = user.username;
      User.upsert({Name:username})
        .then(function(data) {
          callback(null, data);
        });
      // con.query(
      //   'INSERT INTO chat.users SET name = ?', username, function(err, result){
      //     if(err){
      //       callback(err, null);
      //     }else{
      //       callback(null, result);
      //     }
      //   });
    }
  }
};

