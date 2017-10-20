import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from './Drawer';
import './nav.css';
import { connect } from 'react-redux';
import { getUserInfo, getUserFavorites } from '../Redux/reducer';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Search from 'material-ui-icons/Search';
import Avatar from 'material-ui/Avatar';

class ButtonAppBar extends Component {
	constructor() {
		super();
		this.state = {
			profile_pic: ''
		};
	}

	componentDidMount() {
		this.props.getUserInfo();
		setTimeout(() => {
			if (this.props.user) {
				this.props.getUserFavorites(this.props.user.user_id);
			}
		}, 500)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				profile_pic: nextProps.user.profile_pic
			})
		}
	}

	render() {
		const logo1 = require('../images/GrabIconWhite.png');
		const logo2 = require('../images/GrabIconGrey.png');
		const logo3 = require('../images/grabIconOrange.png');

		return (
			<div className="nav">
				<AppBar style={{ backgroundColor: '#4FC3F7' }}>
					<Toolbar className="navtoolbar">
						<div className="navtoolbar">
							<Drawer />
							<div className="navtoolbar">
								<img src={logo1} className="logoicon" />
								<Typography type="title" color="inherit">
									<Link to="/" className="Logo">
										Grab
								</Link>
								</Typography>
							</div>
						</div>

						<div className="wrap">
							<div className="search">
								<input type="text" className="searchTerm" placeholder="What are you looking for?" />
								<button type="submit" className="searchButton">
									<IconButton>
										<Search style={{ marginRight: '20px', marginBottom: '18px' }} />
									</IconButton>
								</button>
							</div>
						</div>

						{/* This turnary checks to see if someone is logged in and displays the correct login/logout button accordingly. */}
						{this.props.user ? (
							<div style={{ display: 'flex' }}>
								<Avatar
									alt="Me"
									src={this.state.profile_pic}
									style={{ width: '40px', height: '40px', marginRight: '5px' }}
								/>
								<a href={process.env.REACT_APP_LOGOUT}>
									<Button color="contrast" style={{ color: 'white', marginTop: '5px' }}>
										Logout
									</Button>
								</a>
							</div>
						) : (
								<a href={process.env.REACT_APP_LOGIN}>
									<Button color="contrast" style={{ color: 'white' }}>
										Login
								</Button>
								</a>
							)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserInfo, getUserFavorites })(ButtonAppBar);
