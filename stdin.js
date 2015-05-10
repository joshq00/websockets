process.stdin.on( 'readable', () => {
	let input = ( process.stdin.read() || '' ).toString().trim();

	switch ( input ) {
	case 'q':
		process.stdin.destroy();
		break;
	default:
		console.log( input );
	}
} );
