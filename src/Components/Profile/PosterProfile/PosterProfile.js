import React, { Component } from 'react';
import './PosterProfile.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserInfo } from '../../../Redux/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBar from '../../SharedComponents/CategoriesBar';
import moment from 'moment';
import 'moment-timezone';

class PosterProfile extends Component {
	constructor() {
		super();
		this.state = {
			userInfo: {},
			listings: [],
			checkedA: false,
			checkedB: false,
			checkedC: false,
			checkedD: false,
			checkedE: false,
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
		if (this.props.location.auth_id) {
			axios.get(`/api/getUserListings/${this.props.location.auth_id}`).then((userListings) => {
				if (Array.isArray(userListings.data)) {
					this.setState({
						listings: userListings.data
					});
				}
			});
			axios.get('/api/getUserInfo/' + this.props.location.auth_id).then((userData) => {
				this.setState({
					userInfo: userData.data
				});
			});
		} else {
			let listingNumber = this.props.location.pathname;
			listingNumber = listingNumber.split('/');
			listingNumber = listingNumber[2];
			axios.get('/api/getUserInfoById/' + listingNumber).then((userData) => {
				this.setState({
					userInfo: userData.data
				});
				axios.get(`/api/getUserListings/${userData.data.auth_id}`).then((userListings) => {
					if (Array.isArray(userListings.data)) {
						this.setState({
							listings: userListings.data
						});
					}
				});
			});
		}
	}

	getUserInfo(auth_id) {
		axios.get('/api/getUserInfo/' + this.props.location.auth_id).then((userData) => {
			this.setState({
				listingUserInfo: userData.data
			});
		});
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

	filter(listings) {
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
			<div>
				<div className="ProfilePageContainer">
					<div className="rightNavFavorites">
						{/* Search Categories Function */}
						<CategoriesBar {...this.state} handleChangeInput={this.handleChangeInput} />
					</div>
					<div className="MainContentProfile">
						<div className="CoverPhoto">
							{/* Cover Photo JSX */}
							<this.coverPhotoInfo />
						</div>

						{this.state.listings.length ? (
							<div>
								<h1 className="ProfileHeading">
									{this.state.userInfo.username + "'s "}Listings ({this.state.listings.length})
								</h1>
								<div className="FavoriteListingsContainer">{this.listingsMap(this.filter(this.state.listings))}</div>
							</div>
						) : (
								<div className="add_listing_container">
									<h1 className="ProfileHeading">You have no listings... :(</h1>
									<Link to="/addListing">
										<div className="add_listing_button">+</div>
									</Link>
								</div>
							)}

						<div className="Chat">
							<div className="ChatNotification" />
							<Avatar style={{ backgroundColor: '#03A9F4', height: '60px', width: '60px' }}>
								<Inbox />
							</Avatar>
						</div>
					</div>
				</div>
			</div>
		);
	}

	coverPhotoInfo = () => {
		const memberSince = new Date(this.state.userInfo.date_created);
		return (
			<div className="CoverPhotoStuff">
				<Avatar
					alt="Me"
					src={this.state.userInfo.profile_pic}
					style={{ width: '120px', height: '120px', marginRight: '40px' }}
				/>
				<div className="memberInfo">
					<h1>{this.state.userInfo.username}</h1>
					<br />
					<h1>Member Since: {moment(memberSince).format('MMMM Do YYYY')}</h1>
				</div>
			</div>
		);
	}

	listingsMap(listings) {
		return listings.map((listing, i) => {
			if (listing.images) {
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
									backgroundSize: 'cover'
								}}>
							</Paper>
							<div className="item_description" style={{ backgroundColor: 'white', borderBottom: '5px solid ' + backgroundColor + '1)' }}>
								<h1 className="title">{listing.title.charAt(0).toUpperCase() + listing.title.slice(1)}</h1>
								<hr style={{ backgroundColor: backgroundColor + '1)', height: '1.5px' }} />
								<h2 className="descriptionText">
									{listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}, {listing.state.charAt(0).toUpperCase() + listing.state.slice(1)}
								</h2>
								{listing.price === '$0.00' ? (
									<h3 className="descriptionText">Free</h3>
								) : (
										<h3 className="descriptionText">{listing.price}</h3>
									)}
							</div>
						</Link>
					</div>
				);
			}
			return true;
		});
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserInfo })(PosterProfile);
