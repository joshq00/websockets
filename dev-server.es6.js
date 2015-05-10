// babel dev-server.es6.js | clip && node --harmony
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.dev.config.es6';

const webpackServer = new WebpackDevServer( webpack( config ), {
	publicPath: config.output.publicPath,
	noInfo: true,
	hot: true,
	historyApiFallback: true
} );

let io;
let news;
webpackServer.listen( config.port, () => {
	io = webpackServer.io;

	news = io
		.of( '/news' )
		.on( 'connection', socket => {
			news.emit( 'news', {
				hello: 'world'
			} );

			socket.on( 'my other event', data => console.log( data ) );

			socket.on( 'message', ( message ) => {
				console.log( 'message received', message );
				// fn( [ name, b, 'ack' ] );
				news.emit( 'news', {
					message
				} );
			} );

			socket.on( 'error', () => console.error( ...arguments ) );
		} );
} );

process.stdin.on( 'readable', () => {
	let input = ( process.stdin.read() || '' ).toString().trim();

	try {
		input = JSON.parse( input );
	} catch ( ex ) {
		console.log( 'not json' );
	}
	news.emit( 'news', input );
	// switch ( input ) {
	// case 'q':
	// 	process.stdin.destroy();
	// 	break;
	// default:
	// 	console.log( input );
	// }
} );

