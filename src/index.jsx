import React from 'react';
import App from './app';

// let logdiv = document.querySelector( '#log' );
// function append ( container, text ) {
// 	let div = document.createElement( 'div' );
// 	div.innerHTML = text;
// 	container.insertBefore( /* new child */ div, /* ref child */ container.firstChild );
// }
// let log = ( ...args ) => {
// 	append( logdiv, args.join( '\n' ) );
// };

React.render( <App />, document.body );
