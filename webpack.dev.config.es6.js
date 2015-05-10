import webpack from 'webpack';
import cfg from './webpack.config.es6';
import { _extend } from 'util';

let port = process.env.PORT || cfg.port || 3000;

let host = `http://localhost:${port}`;

console.log( 'Mapping entry points -> dev server.' );
let entry = Object.keys( cfg.entry ).reduce( ( map, key ) => {
	let val = cfg.entry[ key ];

	if ( !Array.isArray( val ) ) {
		val = [ val ];
	}
	val.unshift(
		`webpack-dev-server/client?${ host }`,
		'webpack/hot/only-dev-server'
	);
	map[ key ] = val;
	return map;
}, {} );

let output = _extend( {}, cfg.output );
_extend( output, {
	publicPath: `${ host }/build`
	// publicPath: cfg.output.path
} );

let loaders = cfg.module.loaders.slice( 0 );
loaders.unshift( {
	test: /\.jsx?$/,
	loaders: [
		'react-hot',
		'babel'
	],
	exclude: /node_modules/
} );

let resolve = cfg.resolve;

let plugins = cfg.plugins.slice( 0 );
plugins.push(
	new webpack.HotModuleReplacementPlugin()
);

export default {
	// target,
	module: { loaders },
	entry,
	output,
	// externals,
	resolve,
	plugins,
	port,
	// devtool: 'source-map'
	devtool: 'eval'
};
