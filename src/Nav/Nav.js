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
			profile_pic: ''
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

	search(input) {
		let timeout = null;
		clearTimeout(timeout);
		this.props.updateSearchTerm(input);
	}

	render() {
		return (
			<div className="nav">
				OK
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserInfo, getUserFavorites, updateSearchTerm })(ButtonAppBar);
