import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Drawer from './Drawer';
import './Nav.css';
import { connect } from 'react-redux';
import { getUserInfo, getUserFavorites, updateSearchTerm } from '../Redux/reducer';
import { Link } from 'react-router-dom';
import Search from 'material-ui-icons/Search';
import Avatar from 'material-ui/Avatar';

class ButtonAppBar extends Component {
	constructor() {
		super();
		this.state = {
			profile_pic: '',
			search: ''
		};
	}

	componentDidMount() {
		this.props.getUserInfo().then(res => {
			if (this.props.user) {
				this.props.getUserFavorites(this.props.user.user_id);
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				profile_pic: nextProps.user.profile_pic
			});
		}
	}

	search = (e) => {
		e.preventDefault();
		this.props.updateSearchTerm(this.state.search);
	}

	render() {
		return (
			<div className="nav">
				<AppBar>
					<Toolbar className="navtoolbar">
						<div className="navtoolbar">
							{
								this.props.user
									?
									<Drawer />
									:
									null
							}
							<div className="navtoolbar">
								<Typography type="title" color="inherit">
									<Link to="/" className="Logo">
										Grab
									</Link>
								</Typography>
							</div>
						</div>

						<div className="wrap">
							<form className="search" onSubmit={this.search}>
								<input type="text" className="search_input" placeholder="What are you looking for?"
									onChange={(e) => this.setState({ search: e.target.value })}
								/>
								<button type="submit" className="searchButton">
									<IconButton>
										<Search className="search_icon" />
									</IconButton>
								</button>
							</form>
						</div>

						{/* This turnary checks to see if someone is logged in and displays the correct login/logout button accordingly. */}
						{this.props.user ? (
							<div className="nav_container_after">
								<div className="nav_add_listing">
									<Link to='/addlisting'>
										<div className="add">
											<div className="add_vert"></div>
											<div className="add_horiz"></div>
										</div>
									</Link>
								</div>
								<div className="nav_profile">
									<Avatar alt='' src={this.state.profile_pic} />
									<a className="logout nav_button" href={process.env.REACT_APP_LOGOUT}>
										<Button>Logout</Button>
									</a>
								</div>
							</div>
						) : (
								<div className="nav_container_before">
									<div className="nav_add_listing">
										<a href={process.env.REACT_APP_LOGIN}>
											<div className="add">
												<div className="add_vert"></div>
												<div className="add_horiz"></div>
											</div>
										</a>
									</div>
									<a className="login nav_button" href={process.env.REACT_APP_LOGIN}>
										<Button>Login</Button>
									</a>
								</div>
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

export default connect(mapStateToProps, { getUserInfo, getUserFavorites, updateSearchTerm })(ButtonAppBar);
