const http = require('http');
const routes = require('./src/routes');

const port = 7000;
const server = http.createServer();

server.on('request', routes.handleRequests);

server.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Running server on localhost:${port}`);
});

module.exports = server;