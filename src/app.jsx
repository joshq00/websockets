import React from 'react';
import io from 'socket.io-client';

let socket = global.socket = io.connect( window.location.origin + '/news' );
// socket.on( 'news', function ( data ) {
// 	log( data );
// 	socket.emit( 'my other event', { my: 'data' } );
// } );

export default class App extends React.Component {
	constructor ( props ) {
		super( props );
		this.dataChanged = this.dataChanged.bind( this );
		this.onSubmit = this.onSubmit.bind( this );
		this.state = {
			data: []
		};
	}

	componentDidMount () {
		socket.on( 'news', this.dataChanged );
	}

	componentWillUnmount () {
		socket.removeListener( 'news', this.dataChanged );
	}

	dataChanged ( item ) {
		let { data } = this.state;
		data.push( item );
		this.setState( { data } );
	}
	onSubmit ( e ) {
		e.preventDefault();
		let inp = React.findDOMNode( this.refs.post );
		socket.send( inp.value );
	}
	render () {
		return (
		<div style={{ whiteSpace: 'pre' }}>
			<form onSubmit={ this.onSubmit }>
				<input ref='post' />
			</form>
			app:<br />
			{ this.state.data.map( ( d, i ) =>
				<div key={i}>{ JSON.stringify( d ) }</div>
			) }
		</div>
		);
	}
}
