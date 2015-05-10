import React from 'react';
import io from 'socket.io-client';

let socket = io();
window.socket = socket;

export default class App extends React.Component {
	constructor ( props ) {
		super( props );
		this.dataChanged = this.dataChanged.bind( this );
		this.onSubmit = this.onSubmit.bind( this );
		this.state = {
			message: '',
			data: []
		};
	}

	componentDidMount () {
		socket.on( 'news', this.dataChanged );
		socket.send( 'connected' );
	}

	componentWillUnmount () {
		socket.removeListener( 'news', this.dataChanged );
	}

	dataChanged ( item ) {
		console.log( item );
		let { data } = this.state;
		data.push( item );
		this.setState( { data } );
	}
	onSubmit ( e ) {
		e.preventDefault();
		let inp = React.findDOMNode( this.refs.post );
		socket.send( inp.value );
		console.log( inp.value );
		this.setState( { message: '' } );
	}
	render () {
		return (
		<div style={{ whiteSpace: 'pre' }}>
			<form onSubmit={ this.onSubmit }>
				Send message
				<input
					onChange={ e => this.setState( { message: e.target.value } ) }
					ref='post'
					value={ this.state.message }
					/>
			</form>

			{ this.state.data.map( ( item, i ) => <Item item={ item } key={ i } /> ) }
		</div>
		);
	}
}

class Item extends React.Component {
	render () {
		let { item } = this.props;
		let { message } = item;
		return (
		<div onClick={ () => socket.send( `${message} clicked` ) }>{ JSON.stringify( item ) }</div>
		);
	}
}
