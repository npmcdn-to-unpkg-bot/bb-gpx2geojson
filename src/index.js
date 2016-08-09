'use strict';

const app = require('./app');
const configPort = app.get('port');

const port = process.env.PORT || configPort;

const server = app.listen(port);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);
