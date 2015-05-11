import express from 'express';

import { Server } from 'http';
import socketio from 'socket.io';

import config from './webpack.dev.config.es6';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const compiler = webpack( config );
const options = {
	publicPath: '/build',
	noInfo: true,
	historyApiFallback: true
};
const server = new Server( app );
const io = socketio( server );

app
	.use( webpackDevMiddleware( compiler, options ) )
	.use( webpackHotMiddleware( compiler ) )
	.use( express.static( '.' ) )
	;

const news = [];

app.get( '/news', ( req, res ) => {
	res.json( news );
} );
function add ( message ) {
	message = { message };
	io.emit( 'news', message );
	news.push( message );
}
io.on( 'connection', socket => {
	console.log( 'connected' );
	socket.on( 'message', message => console.log( message ) );
	socket.on( 'message', add );
} );

server.listen( 3000 );
