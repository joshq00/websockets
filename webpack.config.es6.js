import path from 'path';
const target = 'web';

let entry = {
	index: 'index'
};

let output = {
	path: path.join( __dirname, 'build' ),
	filename: '[name].js'
};

let loaders = [ {
	test: /\.jsx?$/,
	loaders: [
		'babel'
	],
	exclude: /node_modules/
}, {
	test: /\.json$/,
	loader: 'json'
}, {
	test: /\.less$/,
	loaders: [ 'style', 'css', 'less' ]
} ];

let resolve = {
	modulesDirectories: [
		'src',
		'web_modules',
		'node_modules'
	],
	extensions: [
		'',
		'.web.js',
		'.js',
		'.jsx',
		'.es6',
		'.json'
	]
};

let plugins = [
];

let node = {
	console: false,
	// process: false,
	Buffer: false
};

export default {
	target,
	module: { loaders },
	entry,
	output,
	// externals,
	resolve,
	node,
	plugins
};
