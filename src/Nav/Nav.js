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
import { getUserInfo } from '../Redux/reducer';
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
		console.log(this.props)
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.user)
		if (nextProps.user) {
			console.log(nextProps.user[0].profile_pic)
			this.setState({
				profile_pic: nextProps.user[0].profile_pic
			})
		}

	}

	render() {
		return (
			<div className="nav">
				<AppBar style={{ backgroundColor: '#4FC3F7' }}>
					<Toolbar className="navtoolbar">
						<div className="navtoolbar">
							<Drawer className='test' />
							<Typography type="title" color="inherit">
								<Link style={{ color: 'white' }} to="/allListings">
									Grab
								</Link>
							</Typography>
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
							<div style={{display:'flex'}}>
								<a href={process.env.REACT_APP_LOGOUT}>
									<Button color="contrast" style={{ color: 'white', marginTop:'7px' }}>
										Logout
									</Button>
								</a>

								<Avatar
									alt="Me"
									src={this.state.profile_pic}
									style={{ width: '40px', height: '40px', marginRight: '20px' }}
								/>
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

export default connect(mapStateToProps, { getUserInfo })(ButtonAppBar);
