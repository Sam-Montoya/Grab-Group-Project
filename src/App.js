import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import router from './router';
import Nav from './Nav/Nav';
import { MuiThemeProvider } from 'material-ui/styles';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<MuiThemeProvider>
					<Nav reduxUser={this.props.user} />
				</MuiThemeProvider>
				<div style={{ marginTop: '64px' }}>{router}</div>
			</div>
		);
	}
}
