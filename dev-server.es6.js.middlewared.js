import express from 'express';
import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.dev.config.es6';
import { Server } from 'http';
// import './server';

const app = express();
const server = Server( app );
server.listen( config.port, ( err, result ) => {
	if ( err ) {
		console.error( err );
	}

	console.log( 'Listening at localhost:' + config.port );
} );

app.use( express.static( '.' ) );
app.use( webpackMiddleware( webpack( config ), {
	publicPath: config.output.publicPath,
	// hot: true,
	historyApiFallback: true
} ) );

// app.use( '/node_modules', express.static( 'node_modules' ) );


// let httpserver = require( 'http' ).Server( app );
// var io = require( 'socket.io' )( httpserver );
/*
var io = require( 'socket.io' )( server );

io
	.of( '/news' )
	.on( 'connection', socket => {
		socket.emit( 'news', {
			hello: 'world'
		} );
		socket.on( 'my other event', data => console.log( data ) );
	} );

*/
