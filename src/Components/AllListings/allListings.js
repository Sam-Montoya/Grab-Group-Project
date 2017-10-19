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
			priceSorting: 'lowest_to_highest',
			isLoggedIn: false
		};
	}

	componentDidMount() {
		axios.get('/api/getAllListings').then((listings) => {
			this.setState({
				listings: listings.data
			});
		});
		this.props.getUserInfo();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			this.setState({
				profile_pic: nextProps.user.profile_pic,
				isLoggedIn: true
			});
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
		console.log(this.state.listings);
		let listings = this.state.listings.map((listing, i) => {
			let imageTest;
			if (listing.images !== null) imageTest = listing.images[0];
			if (this.state.listings.length)
				return (
					<div key={i}>
						<Link
							to={{
								pathname: '/listingInfo/' + listing.listing_id,
								query: listing
							}}>
							<Paper
								elevation={4}
								className="item_container"
								style={{
									background: `url(${imageTest}) no-repeat center center`,
									backgroundSize: 'cover'
								}}>
								<div
									className="item_description"
									style={{ backgroundColor: 'rgba(53, 138, 255, 0.68)' }}>
									<h1 className="title">{listing.title}</h1>
									<hr />
									<h2 className="descriptionText">
										{listing.city}, {listing.state}
									</h2>
									{listing.price === '$0.00' ? (
										<h3 className="descriptionText">Free</h3>
									) : (
										<h3 className="descriptionText">{listing.price}</h3>
									)}
								</div>
							</Paper>
						</Link>
					</div>
				);
		});

		return (
			<div className="sidebar">
				<div className="leftBarOnSearch">
					{this.state.isLoggedIn ? (
						<div>
							<section className="profile_pic_nav_container">
								<Link to="/profile">
									<Avatar
										className="profile_pic_nav"
										alt="Remy Sharp"
										src={this.state.profile_pic ? this.state.profile_pic : profile}
									/>
								</Link>
							</section>

							<List className="user_options">
								<Link to="/myChats">
									<ListItem button>
										<Avatar className="inbox_circle">
											<h1>1</h1>
										</Avatar>

										<ListItemText primary="Inbox" />
									</ListItem>
								</Link>

								<Link to="/profile">
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
						</div>
					) : (
						<div />
					)}

					<h1 className="search_header">Search Filters</h1>

					<div className="categories">
						<p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Categories</p>
						<div className="electronics_checkbox">
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedA}
										onChange={this.handleChangeInput('checkedA')}
										value="checkedA"
									/>
								}
								label="Electronics"
							/>
						</div>
						<div className="home_checkbox">
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedB}
										onChange={this.handleChangeInput('checkedB')}
										value="checkedB"
									/>
								}
								label="Home"
							/>
						</div>
						<div className="sports_checkbox">
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
						</div>

						<div className="parts_checkbox">
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
						</div>

						<div className="free_checkbox">
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
