import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './allListings.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Star from 'material-ui-icons/Star';
import Pageview from 'material-ui-icons/List';
import Input from 'material-ui/Input';
import profile from '../../images/benMt.1866739e.jpg';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../Redux/reducer';
import { connect } from 'react-redux';

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
			priceSorting: 'lowest_to_highest',
			isLoggedIn: false,
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
		setTimeout(() => {
			if (this.props.search_term !== '') {
				axios.get('/api/search/' + this.props.search_term).then((results) => {
					this.setState({
						filteredListings: results.data
					});
				});
			} else {
				this.setState({
					filteredListings: []
				});
			}
		}, 1000);
	}

	handleChangeInput = (name) => (event) => {
		if(event.target.checked){
			this.setState({
				[name]: event.target.checked,
				filters: Object.assign({}, this.state.filters, {[name]: event.target.value})
		   });
		} else {
			this.setState({
				[name]: event.target.checked,
				filters: Object.assign({}, this.state.filters, {[name]: ''})
		   });
		}
	};

	handleInputChange = (name) => (event) => {
		this.setState({
			[name]: event.target
		});
	};

	filter(listings){
		for(let prop in this.state.filters){
			if(this.state.filters[prop] !== ''){
				listings = listings.filter(listing => {
					for(let prop in this.state.filters){
						if(listing.category === this.state.filters[prop]){
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
										src={this.state.profile_pic ? this.state.profile_pic : profile}
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
						<Input type="number" placeholder="Zip" />
						<Input type="number" placeholder="Miles Away" />
					</div>

					<div className="pricing_container">
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
		return listings.map((listing, i) => {
			let backgroundColor;
			switch (listing.category) {
				case 'Electronics':
					backgroundColor = 'rgba(53, 138, 255, 0.68)';
					break;
				case 'Home':
					backgroundColor = 'rgba(147, 74, 255, 0.68)';
					break;
				case 'Sports':
					backgroundColor = 'rgba(104, 208, 52, 0.68)';
					break;
				case 'Parts':
					backgroundColor = 'rgba(151, 151, 151, 0.68)';
					break;
				case 'Free':
					backgroundColor = 'rgba(255, 127, 127, 0.68)';
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
								backgroundSize: 'cover'
							}}>
							<div className="item_description" style={{ backgroundColor: backgroundColor }}>
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
