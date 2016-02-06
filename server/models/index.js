var db = require('../db');
var con = db.connection;

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (message) {
      //open the message;
      console.log(message);
      var username = message.username;
      var roomname = message.roomname;
      var content = message.message;

      con.query(
        'SELECT id FROM chat.users WHERE name = ?', username, function(err, res){
          if(err){
            console.log("Select error:", err);
          }else{
            con.query('INSERT INTO chat.messages(content,userID,room) values(?,?,?);', [content, res[0].id, roomname], function(err, result){
            // console.log(result);
              if(err){
                console.log("Message error:", err);
              }else{
                // console.log(result);
                console.log("Inserted a message");
                // con.query('SELECT * FROM chat.messages', function(err, ressy){
                  // console.log(err, ressy);
                // });
              }
            });
          }
        });
      //Get roomID and userID from relevant tables
        //fresh inserts if not found
      //query messages table
        //insert variables 
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
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

