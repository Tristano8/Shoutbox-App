exports.notfound = function(req,res) {
  res.status(404).format({
    html: function() {
      res.render('404');
    },
    json: function() {
      res.send({ message: 'Resource not found' });
    },
    xml: function() {
      res.write('<error>\n');
      res.write(' <message>Resource not found</message>\n');
      res.end('</error>\n');
    },
    text: function() {
      res.send('Resource not found\n');
    }
  });
};

exports.error = function(err, req, res, next) { // Must accept four arguments
  console.error(err.stack);
  let msg;

  switch (err.type) {
    case 'database':
      msg = 'Server Unavailable';
      res.statusCode = 503;
      break;
    default:
      msg = 'Internal Server Error';
      res.statusCode = 500;
  }
  res.format({
    html: function() {
      res.render('5xx', {msg: msg, status: res.statusCode}); // Render template when HTML is accepted
    },

    json: function() {
      res.send({error: msg}); // Respond with JSON when accepted
    },

    text: function() {
      res.send(msg + '\n');
    }
  });
};
