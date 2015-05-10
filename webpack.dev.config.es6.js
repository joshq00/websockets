import webpack from 'webpack';
import cfg from './webpack.config.es6';

let port = process.env.PORT || cfg.port || 3000;

console.log( 'Mapping entry points -> dev server.' );
let entry = Object.keys( cfg.entry ).reduce( ( map, key ) => {
	let val = cfg.entry[ key ];

	if ( !Array.isArray( val ) ) {
		val = [ val ];
	}
	val.unshift(
		/* webpack-hot-middleware */
		'webpack-hot-middleware/client',
		'webpack/hot/dev-server'
	);
	map[ key ] = val;
	return map;
}, {} );

let { output } = cfg;

let loaders = [ {
	test: /\.jsx?$/,
	loaders: [
		'react-hot',
		'babel'
	],
	exclude: /node_modules/
}, ...cfg.module.loaders ];

let { resolve } = cfg;

let plugins = [
	...cfg.plugins,
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin()
];

export default {
	// target,
	module: { loaders },
	entry,
	output,
	// externals,
	resolve,
	plugins,
	port,
	devtool: 'eval'
};
