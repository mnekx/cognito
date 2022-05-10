const http = require('http');
const config = require('./lib/config');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const fs = require('fs')
const _data = require('./lib/data')
const handlers = require('./lib/handlers');
const helpers = require("./lib/helpers");

const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res)
});

const httpsServerOptions = {
  'key': fs.readFileSync('./server/https/key.pem'),
  'cert': fs.readFileSync('./server/https/cert.pem'),
}
const httpsServer = http.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res)
});

httpServer.listen(config.httpPort, ()=>{
  console.log('http server listening on port '+config.httpPort)
})

httpsServer.listen(config.httpsPort, ()=>{
  console.log('https server listening on port '+config.httpsPort)
})

const router = {
  users: handlers.users,
  tokens: handlers.tokens
};

const unifiedServer = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const method = req.method.toLowerCase();

  const queryStringObject = parsedUrl.query;

  const headers = req.headers;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    const data = {
      method: method,
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      payload: helpers.parseJsonToObject(buffer),
      headers: headers,
    };

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      payload = typeof payload == 'object' ? payload : {};
      const payloadString = JSON.stringify(payload);

      res.setHeader('Content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log('returning: ', statusCode, payload);
    });
  });
};
