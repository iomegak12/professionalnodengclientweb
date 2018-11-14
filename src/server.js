
var express = require('express');
var server = express();
var request = require('request');
var bodyParser = require('body-parser');
var domain = require('domain').create();
var http = require('http');

require("appdynamics").profile({
  controllerHostName: 'castro2018111319544211.saas.appdynamics.com',
  controllerPort: '443',
  controllerSslEnabled: true,
  accountName: 'castro2018111319544211',
  accountAccessKey: 'dyxac69gvb1q',
  applicationName: 'SampleApp',
  tierName: 'WebServices',
  nodeName: 'WebNode'
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

domain.on('error', function (err) {
});

server.use(express.static(__dirname + '/public'));


//-------- Business Transactions ----------------------

server.get('/products', function (serverRequest, res) {
  productsCall('GET', '', serverRequest, res)
});

server.get('/delete', function (serverRequest, res) {
  params = JSON.stringify(serverRequest.query);
  productsCall('DELETE', params, serverRequest, res);
});

server.get('/update', function (serverRequest, res) {
  params = JSON.stringify(serverRequest.query);

  productsCall('PUT', params, serverRequest, res)

});

server.post('/add', function (serverRequest, res) {
  params = JSON.stringify(serverRequest.body.params);
  productsCall('POST', params, serverRequest, res);
});

function productsCall(method, params, serverRequest, res) {
  var id = "";
  if (method !== "POST" && method !== "GET") {
    id = serverRequest.query["id"];
  }

  data = {
    method: method,
    url: "http://restserver:8083/api/notes/" + id,
    body: params,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': params.length
    }
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      var parsedBody = JSON.parse(body);

      if (method === "POST" || method === "PUT" || method === "DELETE") {
        body = {
          id: parsedBody.id,
          name: parsedBody.title,
          stock: parsedBody.content
        };
      }
      else {
        var items = [];

        for (let index in parsedBody) {
          var pItem = parsedBody[index];
          var item = {
            id: pItem.id,
            name: pItem.title,
            stock: pItem.content
          };

          items.push(item);
        }

        body = JSON.stringify(items);
      }

      res.send(body);
    } else {
      res.send(params);
    }
  });
}

//-------- Exceptions ----------------------

//This endpoint doesn't exist on Java backend
server.get('/exception', function (serverRequest, response) {
  domain.run(function () {
    throw new Error('User triggered exception!');
  });
  response.send("[]");
});

server.get('/sql_error', function (serverRequest, res) {
  data = {
    method: "GET",
    url: "http://restserver:8083/api/notes/sql_error"
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      res.send(body);
    } else {
      res.send('[]');
    }
  });
});

server.get('/java_error', function (serverRequest, res) {
  data = {
    method: "GET",
    url: "http://restserver:8083/api/notes/java_error"
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      res.send(body);
    } else {
      res.send('[]');
    }
  });
});

server.get('/exceptions/slow/10', function (serverRequest, res) {
  data = {
    method: "GET",
    url: "http://restserver:8083/api/notes/slow/10"
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      res.send(body);
    } else {
      res.send('[]');
    }
  });
});


//-------- slow transactions ----------------------

server.get('/exceptions/slow/20', function (serverRequest, res) {
  data = {
    method: "GET",
    url: "http://restserver:8083/api/notes/slow/20"
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      res.send(body);
    } else {
      res.send('[]');
    }
  });
});

server.get('/exceptions/slow/30', function (serverRequest, res) {
  data = {
    method: "GET",
    url: "http://restserver:8083/api/notes/slow/30"
  };

  request(data, function (error, apiResponse, body) {
    if (apiResponse && body) {
      res.send(body);
    } else {
      res.send('[]');
    }
  });
});

server.listen(3000, '0.0.0.0', function () {
  console.log('Node Server Started');
});

server.on('error', function (e) {
  console.log('Node Server Failed');
  console.log(e);
});
