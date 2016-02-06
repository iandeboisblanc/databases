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
      console.log(con.query);
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

