#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('cleanMiniWiki:server');
var http = require('http');

/*
--get port 
*/

var port = normalizePort(process.env.Port || '8080');
app.set('port', port);


/*
--Create HTTP Server
*/

var server = http.createServer(app);

server.listen(port);


function normalizePort(val)
{
	var port = parseInt(val, 10);

	if(isNaN(port))
	{
		return val;
	}

	if(port >= 0)
	{
		return port;
	}

	return false;
}

function onError(error)
{
	if(error.syscall !== 'listen')
	{
		throw error;
	}

	var bind = typeof port === 'string'
	? 'Pipe' + port
	: 'Port' + port;

	switch (error.code) 
	{
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  	}
}

function onListening()
{
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}