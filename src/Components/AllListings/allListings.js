import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './allListings.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Inbox from 'material-ui-icons/Inbox';
import Star from 'material-ui-icons/Star';
import Pageview from 'material-ui-icons/List';
import Input from 'material-ui/Input';
import profile from '../../images/benMt.1866739e.jpg';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import green from 'material-ui/colors/green';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../Redux/reducer';
import { connect } from 'react-redux';

// const styles = {
//     checked: {
//         color: green[500],
//     },
// };

class allListings extends Component {
	constructor() {
		super();
		this.state = {
			listings: [],
			checkedA: false,
			checkedB: false,
			checkedC: false,
			checkedD: false,
			checkedE: false,
			profile_pic: '',
			priceSorting: 'lowest_to_highest'
		};
	}

	componentDidMount() {
		axios.get('http://localhost:3060/api/getUserListings').then((res) => {
			this.setState({
				listings: res.data
			});
		});
		this.props.getUserInfo();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				profile_pic: nextProps.user.profile_pic
			});
			console.log(this.props.user);
			if(this.props.user.hasOwnProperty('username')) console.log('Hit');
		}
	}

	handleChangeInput = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	handleInputChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		let listings = this.state.listings.map((elem, i) => {
			if (elem.image)
				return (
					<div key={i}>
						<a href="http://localhost:3000/#/listinginfo">
							<Paper
								elevation={4}
								className="item_container"
								style={{
									background: `url(${elem.image}) no-repeat center center`,
									backgroundSize: 'cover'
								}}>
								<div
									className="item_description"
									style={{ backgroundColor: 'rgba(53, 138, 255, 0.68)' }}>
									<h1 className="title">Product Title</h1>
									<hr />
									<h2 className="descriptionText">Sandy, Utah</h2>
									<h3 className="descriptionText">$400</h3>
								</div>
							</Paper>
						</a>
					</div>
				);
		});

		return (
			<div className="sidebar">
				<div className="leftBarOnSearch">
					<Avatar
						alt="Remy Sharp"
						src={this.state.profile_pic ? this.state.profile_pic : profile}
						style={{ width: '60px', height: '60px', margin: 'auto', marginTop: '20px' }}
					/>

					<List className="user_options">
						<Link to="/myChats">
							<ListItem button>
								<Avatar className="inbox_circle">
									<h1>1</h1>
								</Avatar>

								<ListItemText primary="Inbox" />
							</ListItem>
						</Link>

						<Link to="/myListings">
							<ListItem button>
								<Pageview className="listings_icon" />
								<ListItemText primary="Listings" />
							</ListItem>
						</Link>

						<Link to="/myFavorites">
							<ListItem button>
								<Star className="favorites_icon" />
								<ListItemText primary="Favorites" />
							</ListItem>
						</Link>
					</List>

					<h1 className="search_header">Search Filters</h1>

					<div className="categories">
						<p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Categories</p>
						<div>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedA}
										onChange={this.handleChangeInput('checkedA')}
										value="checkedA"
										style={{ color: 'red' }}
									/>
								}
								label="Electronics"
							/>
						</div>
						<div>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedB}
										onChange={this.handleChangeInput('checkedB')}
										value="checkedB"
										style={{ color: 'Purple' }}
									/>
								}
								label="Home"
							/>
						</div>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.checkedC}
									onChange={this.handleChangeInput('checkedC')}
									value="checkedC"
									style={{ color: 'green' }}
								/>
							}
							label="Sports"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.checkedD}
									onChange={this.handleChangeInput('checkedD')}
									value="checkedD"
									style={{ color: 'grey' }}
								/>
							}
							label="Parts"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.checkedE}
									onChange={this.handleChangeInput('checkedE')}
									value="checkedE"
									style={{ color: 'green' }}
								/>
							}
							label="Free"
						/>
					</div>

					<section className="search_inputs">
						<p style={{ fontWeight: 'bold' }}>Distance</p>
						<Input type="number" placeholder="Zip" />
						<Input type="number" placeholder="Miles Away" />
					</section>

					<section className="pricing_container">
						<h1 style={{ fontWeight: 'bold' }}>Pricing</h1>
						<Input type="number" placeholder="Lowest" />
						<Input type="number" placeholder="Highest" />
						<TextField
							className="pricing_select"
							select
							value={this.state.priceSorting}
							onChange={this.handleInputChange('priceSorting')}
							style={{ width: '82%' }}>
							<MenuItem value="lowest_to_highest">Lowest to Highest</MenuItem>
							<MenuItem value="highest_to_lowest">Highest to Lowest</MenuItem>
						</TextField>
					</section>
				</div>
				<div className="SearchContainer">{listings}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { getUserInfo })(allListings);
