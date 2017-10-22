import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Home from 'material-ui-icons/Home';
import Settings from 'material-ui-icons/Settings';
import Create from 'material-ui-icons/Create';
import ViewList from 'material-ui-icons/ViewList';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Profile from 'material-ui-icons/Face';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import Avatar from 'material-ui/Avatar';

const styles = {
	list: {
		width: 250,
		flex: 'initial'
	},
	listFull: {
		width: 'auto',
		flex: 'initial'
	}
};

class TemporaryDrawer extends React.Component {
	constructor() {
		super();

		this.state = {
			open: {
				top: false,
				left: false,
				bottom: false,
				right: false,

				//REDIRECTS
				loggedin: false,
				redirect: '',

				//ALERT
				alert: false
			}
		};
	}

	//ALERT

	handleClickOpen = () => {
		this.setState({ alert: true });
	};

	handleRequestClose = () => {
		this.setState({ alert: false });
	};

	//DRAWER

	toggleDrawer = (side, open) => {
		const drawerState = {};
		drawerState[side] = open;
		this.setState({ open: drawerState });
	};

	handleLeftOpen = () => {
		this.toggleDrawer('left', true);
	};

	handleLeftClose = () => {
		this.toggleDrawer('left', false);
	};

	componentDidMount() {
		axios.get(`/auth/me`).then((res) => {
			//Before the page loads it hits this endpoint to check if there is a user on req.user.
			console.log('AUTH', res.data);
			if (res.data.user_name) {
				//If there is a user.
				this.setState({
					loggedin: true
				});
			}
		});
	}

	render() {
		const classes = this.props.classes;

		//REDIRECTS
		if (this.state.redirect === 'profile') {
			this.setState({
				redirect: ''
			});
			return <Redirect push to={'/profile'} />;
		}
		if (this.state.redirect === 'property') {
			this.setState({
				redirect: ''
			});
			return <Redirect push to={'/wizard'} />;
		}
		if (this.state.redirect === 'settings') {
			this.setState({
				redirect: ''
			});
			return <Redirect push to={'/'} />;
		}

		const sideList = (
			<div>
				<List className={classes.root}>
					<Link to="/">
						<ListItem button>
							<Avatar>
								<Home />
							</Avatar>
							<ListItemText primary="Home" />
						</ListItem>
					</Link>
					<Link to="/profile">
						<ListItem button>
							<Avatar>
								<Profile />
							</Avatar>
							<ListItemText primary="Profile" />
						</ListItem>
					</Link>
					{/* <Divider inset /> */}
					<Link to="/myfavorites">
						<ListItem button>
							<Avatar>
								<ViewList />
							</Avatar>
							<ListItemText primary="My Favorites" />
						</ListItem>
					</Link>
					{/* <Divider inset /> */}
					<Link to="/addlisting">
						<ListItem button>
							<Avatar>
								<Create />
							</Avatar>
							<ListItemText primary="Create Listing" />
						</ListItem>
					</Link>

					{/* <Divider inset /> */}
					<Link to="settings">
						<ListItem button>
							<Avatar>
								<Settings />
							</Avatar>
							<ListItemText primary="Settings" />
						</ListItem>
					</Link>
					{/* <Divider inset /> */}
				</List>
			</div>
		);

		return (
			<div>
				{console.log(this.state)}
				<IconButton style={{ color: 'white' }} aria-label="Menu" onClick={this.handleLeftOpen}>
					<MenuIcon />
				</IconButton>

				<Drawer
					open={this.state.open.left}
					onRequestClose={this.handleLeftClose}
					onClick={this.handleLeftClose}>
					{sideList}
				</Drawer>

				{/* ALERT */}
				<Dialog open={this.state.alert} transition={Slide} onRequestClose={this.handleRequestClose}>
					<DialogTitle>{'Please Sign In'}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To use some of our awesome features, you need to be logged in
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleRequestClose} color="primary">
							No Thanks
						</Button>
						<a href={process.env.REACT_APP_LOGIN}>
							<Button onClick={this.handleRequestClose} color="primary">
								Okay
							</Button>
						</a>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

TemporaryDrawer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
