import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.dev.config.es6';

var app = express();
var compiler = webpack( config );
var options = {
	publicPath: '/build',
	noInfo: true,
	historyApiFallback: true
};

app
	.use( webpackDevMiddleware( compiler, options ) )
	.use( require( 'webpack-hot-middleware' )( compiler ) )
	.use( express.static( '.' ) )
	;

var server = require( 'http' ).Server( app );
var io = require( 'socket.io' )( server );
io.on( 'connection', socket => {
	console.log( 'connected' );
	socket.on( 'message', message => console.log( message ) );
	socket.on( 'message', message => io.emit( 'news', { message: message } ) );
} );

server.listen( 3000 );
