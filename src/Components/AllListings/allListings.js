import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './allListings.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Star from 'material-ui-icons/Star';
import Button from 'material-ui/Button';
import Pageview from 'material-ui-icons/List';
import Input from 'material-ui/Input';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../Redux/reducer';
import { connect } from 'react-redux';
import _ from 'lodash';

class allListings extends Component {
	constructor() {
		super();
		this.state = {
			listings: [],
			filteredListings: [],
			checkedA: false,
			checkedB: false,
			checkedC: false,
			checkedD: false,
			checkedE: false,
			profile_pic: '',
			priceSorting: 'Most Recent',
			isLoggedIn: false,
			lowest: 0,
			highest: 999999999999,
			zip: '',
			milesAway: '',
			zipRadius: [],
			filters: {
				checkedA: '',
				checkedB: '',
				checkedC: '',
				checkedD: '',
				checkedE: ''
			}
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
		if (nextProps.search_term) {
			axios.get('/api/search/' + nextProps.search_term).then((results) => {
				if (results.data.length === 0) {
					this.setState({
						filteredListings: `No Listings match ${this.props.search_term}`
					});
				} else {
					this.setState({
						filteredListings: results.data
					});
				}
			});
		} else {
			this.setState({
				filteredListings: []
			});
		}
	}

	handleChangeInput = (name) => (event) => {
		if (event.target.checked) {
			this.setState({
				[name]: event.target.checked,
				filters: Object.assign({}, this.state.filters, { [name]: event.target.value })
			});
		} else {
			this.setState({
				[name]: event.target.checked,
				filters: Object.assign({}, this.state.filters, { [name]: '' })
			});
		}
	};

	handleInputChange = (name) => (event) => {
		this.setState({
			[name]: event.target
		});
	};

	checkLowest(input) {
		if (input == '') {
			this.setState({
				lowest: 0
			});
		} else {
			this.setState({
				lowest: input
			})
		}
	}

	checkHighest(input) {
		if (input == '') {
			this.setState({
				highest: 999999999999
			});
		} else {
			this.setState({
				highest: input
			})
		}
	}

	search() {
		axios.get(`/api/zipRadius/${this.state.zip}/${this.state.milesAway}`).then(res => {
			if (res.status === 200) {
				this.setState({
					zipRadius: res.data.zip_codes
				})
			}
		});
	}

	reset() {
		this.setState({
			zip: '',
			milesAway: '',
			zipRadius: [],
		})
	}

	filter(listings) {
		if (listings === `No Listings match ${this.props.search_term}`) {
			return listings;
		}

		if (this.state.zipRadius.length) {
			listings = listings.filter(listing => {
				for (let i = 0; i < this.state.zipRadius.length; i++) {
					if (parseInt(listing.zip) === parseInt(this.state.zipRadius[i])) {
						return listing;
					}
				}
			});
		}

		if (listings.length) {
			if (this.state.priceSorting === 'Highest to Lowest') {
				listings = _.sortBy(listings, [function (listing) {
					let price = listing.price.split('$');
					return parseInt(price[1]);
				}]).reverse();
			} else if (this.state.priceSorting === 'Lowest to Highest') {
				listings = _.sortBy(listings, [function (listing) {
					let price = listing.price.split('$');
					return parseInt(price[1]);
				}]);
			}
		}

		if (this.state.lowest && this.state.highest || this.state.lowest || this.state.highest) {
			listings = listings.filter(listing => {
				let price = listing.price.split('$');
				if (parseInt(price[1]) >= parseInt(this.state.lowest) && parseInt(price[1]) <= parseInt(this.state.highest)) {
					return listing;
				}
			});
		}

		for (let prop in this.state.filters) {
			if (this.state.filters[prop] !== '') {
				listings = listings.filter(listing => {
					for (let prop in this.state.filters) {
						if (listing.category === this.state.filters[prop]) {
							return listing;
						}
					}
				});
			}
		}
		return listings;
	}

	render() {
		return (
			<div className="sidebar">
				<div className="leftBarOnSearch">
					{this.state.isLoggedIn ? (
						<div>
							<div className="profile_pic_nav_container">
								<Link to="/profile">
									<Avatar
										className="profile_pic_nav"
										alt="Remy Sharp"
										src={this.state.profile_pic}
									/>
								</Link>
							</div>

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
										value={'Electronics'}
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
										value={'Home'}
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
										value={'Sports'}
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
										value={'Parts'}
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
										value={'Free'}
										style={{ color: 'green' }}
									/>
								}
								label="Free"
							/>
						</div>
					</div>

					<div className="search_inputs">
						<p style={{ fontWeight: 'bold' }}>Distance</p>
						<Input type="number" placeholder="Zip" value={this.state.zip} onChange={(e) => { this.setState({ zip: e.target.value }) }} />
						<Input type="number" placeholder="Miles Away" value={this.state.milesAway} onChange={(e) => { this.setState({ milesAway: e.target.value }) }} />
						<section style={{ width: '90%', margin: 'auto', display: 'flex', justifyContent: 'space-around' }}>
							<button className="allListingsButton _searchButton" onClick={() => { this.search() }}>Search</button>
							<button className="allListingsButton _resetButton" onClick={() => { this.reset() }}>Reset</button>
						</section>
					</div>

					<div className="pricing_container">
						<h1 style={{ fontWeight: 'bold' }}>Pricing</h1>
						<Input type="number" placeholder="Lowest" onChange={(e) => { this.checkLowest(e.target.value) }} />
						<Input type="number" placeholder="Highest" onChange={(e) => { this.checkHighest(e.target.value) }} />
						<TextField
							className="pricing_select"
							onChange={(e) => { this.setState({ priceSorting: e.target.value }) }}
							select
							value={this.state.priceSorting}
							style={{ width: '82%' }}>
							<MenuItem value="Most Recent">Most Recent</MenuItem>
							<MenuItem value="Lowest to Highest">Lowest to Highest</MenuItem>
							<MenuItem value="Highest to Lowest">Highest to Lowest</MenuItem>
						</TextField>
					</div>
				</div>
				<div className="SearchContainer">
					{this.state.filteredListings.length ? (
						this.listingsMap(this.filter(this.state.filteredListings))
					) : (
							this.listingsMap(this.filter(this.state.listings))
						)}
				</div>
			</div>
		);
	}

	listingsMap(listings) {
		if (listings === `No Listings match ${this.props.search_term}`) {
			return listings;
		}
		return listings.map((listing, i) => {
			let backgroundColor;
			switch (listing.category) {
				case 'Electronics':
					backgroundColor = 'rgba(53, 138, 255, ';
					break;
				case 'Home':
					backgroundColor = 'rgba(147, 74, 255, ';
					break;
				case 'Sports':
					backgroundColor = 'rgba(104, 208, 52, ';
					break;
				case 'Parts':
					backgroundColor = 'rgba(151, 151, 151, ';
					break;
				case 'Free':
					backgroundColor = 'rgba(255, 127, 127, ';
					break;
				default:
					backgroundColor = 'rgba(0, 255, 255, 0.68)';
					break;
			}

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
								background: `url(${listing.images[0]}) no-repeat center`,
								backgroundSize: 'cover',
								borderBottom: '5px solid ' + backgroundColor + '1)'
							}}>
							<div className="item_description" style={{ backgroundColor: backgroundColor + '0.45)' }}>
								<h1 className="title">{listing.title.charAt(0).toUpperCase() + listing.title.slice(1)}</h1>
								<hr />
								<h2 className="descriptionText">
									{listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}, {listing.state.charAt(0).toUpperCase() + listing.state.slice(1)}
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
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		search_term: state.search_term
	};
}

export default connect(mapStateToProps, { getUserInfo })(allListings);
