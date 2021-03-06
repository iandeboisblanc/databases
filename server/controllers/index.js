var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, results) {
        if(err) {
          console.log('Error getting message Data:', err);
        } else {
          res.writeHead(200, headers);
          var returnResults = [];
          results.forEach(function(resultObj) {
            console.log('########resutlOBJ:##########',resultObj);
            returnResults.push({
              username: resultObj.user.dataValues.Name,
              createdAt: resultObj.dataValues.createdAt,
              objectId: resultObj.dataValues.ID,
              text: resultObj.dataValues.Content,
              roomname: resultObj.dataValues.Room
            });
            //console.log("=>",resultObj);
          });
          res.end(JSON.stringify(returnResults));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //run query to put data into messages
      //insert into rooms if necessary
      var message = req.body;
      models.messages.post(message, function(err, results) {
        if(err) {
          console.log(err);
          res.writeHead(500, headers);
          res.end('Error posting message');
        } else {
          res.writeHead(201, headers);
          res.end("message received");
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(function(err, results) {
        if(err) {
          console.log('Error getting user Data:', err);
        } else {
          res.writeHead(200, headers);
          res.end('results');
        }
      });
    },
    post: function (req, res) {
      var user = req.body;
      models.users.post(user, function(err, results){
        if(err) {
          console.log('error posting user info');
          res.writeHead(500, headers);
          res.end('messed up posting user');
        } else {
          res.writeHead(201, headers);
          res.end('user posted!');
        }
      });
    }
  }
};
