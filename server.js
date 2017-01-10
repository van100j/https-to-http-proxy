var express = require('express');
var request = require('request');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
    var host = req.get('host');
    res.send(
      ['<body>',
        '<h1>Provide the URL you need</h1>',
      '</body>'].join('')
      );
});

function createQueryString(obj) {
  var keys = Object.keys(obj),
      i;
  var parts = keys.reduce(function(a, b) {
    return a.concat(b + '=' + obj[b]);
  }, []);

  return parts.join("&");
}

app.get(['/http://', '/http://*'], function(req, res) {
  var url, queryString = createQueryString(req.query);

  queryString = queryString ? "?" + queryString : "";

  console.log('http://' + req.params[0] + queryString);

  if(url = req.params[0]) {
    request('http://' + url + queryString, function (error, response, body) {
      console.log(body);
      if (!error && response.statusCode == 200) {
        res.send(body);
      } else {
        res.send(error);
      }
    });
  } else {
    res.send("Invalid request!");
  }
});

app.listen(app.get('port'), function() {
    console.log('App listening on port ' + app.get('port'));
});
