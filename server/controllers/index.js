var models = require('../models');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'json/html'
};

module.exports = {
  messages: {
    get: function (req, res) {
      //Run query to get messages
      res.writeHead(200, headers);
      res.end('ended');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //run query to put data into messages
      //insert into rooms if necessary
      var message = req.body;
      models.messages.post(message);
      res.writeHead(201, headers);
      res.end("message received");
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var user = req.body;
      models.users.post(user);
      res.writeHead(201, headers);
      res.end("sent");
    }
  }
};
