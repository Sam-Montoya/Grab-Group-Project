import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import router from './router';
import Nav from './Nav/Nav';

export default class App extends Component {
	render() {
		return (
			<div className="App">
					<Nav reduxUser={this.props.user} />
				<div style={{ marginTop: '64px' }}>{router}</div>
			</div>
		);
	}
}
