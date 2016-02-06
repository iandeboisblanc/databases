var db = require('../db');
var con = db.connection;

module.exports = {
  messages: {
    get: function (callback) {
      con.query(
        'SELECT * FROM chat.messages a JOIN chat.users b ON a.UserID = b.ID', function(err, results) {
          if(err) {
            callback(err, null);
          } else {
            console.log('Got message data!');
            callback(null, results);
          }
        });
    }, // a function which produces all the messages
    post: function (message) {
      //open the message;
      var username = message.username;
      var roomname = message.roomname;
      var content = message.message;
      con.query(
        'SELECT id FROM chat.users WHERE name = ?', username, function(err, res){
          if(err){
            console.log("Select error:", err);
          }else{
            con.query('INSERT INTO chat.messages(content,userID,room) values(?,?,?);', [content, res[0].id, roomname], function(err, result){
              if(err){
                console.log("Message error:", err);
              }else{
                console.log("Inserted a message");
              }
            });
          }
        });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      con.query(
        'SELECT * FROM chat.users', function(err, results) {
          if(err) {
            callback(err, null);
          } else {
            console.log('Got user data!');
            callback(null, results);
          }
        });
    },
    post: function (user) {
      var username = user.username;
      con.query(
        'INSERT INTO chat.users SET name = ?', username, function(err, result){
          if(err){
            console.log("Err:", err);
          }else{
            console.log("Inserted", result.insertId);
          }
        });
    }
  }
};

