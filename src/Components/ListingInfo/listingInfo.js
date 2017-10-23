import React, { Component } from 'react';
import ListingImages from './listingImages';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Inbox from 'material-ui-icons/Message';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserFavorites } from '../../Redux/reducer';
import SnackBars from '../SharedComponents/SnackBars';

class ListingInfo extends Component {
	constructor() {
		super();
		this.state = {
			listingInfo: {
				auth_id: '',
				category: '',
				city: '',
				cons: '',
				contact_status: '',
				description: '',
				images: [],
				listing_id: null,
				phone_number: '',
				price: '',
				pros: '',
				state: '',
				time_submitted: '',
				title: '',
				user_id: 0,
				zip: 0
			},
			listingUserInfo: {},
			twitter: require('../../images/TwitterLogo2.png'),
			gmail: require('../../images/mailLogo.png'),
			faceboook: require('../../images/fbLogo.png'),
			isFavorite: false,
			isOpen: false,
			snackbar_message: ''
		};
		this.favoriteIcon = this.favoriteIcon.bind(this);
	}

	componentDidMount() {
		let listingNumber = this.props.location.pathname;
		listingNumber = listingNumber.split('/');
		listingNumber = listingNumber[2];

		if (this.props.location.query) {
			this.setState({
				listingInfo: this.props.location.query
			});
			this.getUserInfo(this.props.location.query.auth_id);
		} else {
			axios.get('/api/getListing/' + listingNumber).then((listingData) => {
				this.setState({
					listingInfo: listingData.data
				});
				this.getUserInfo(listingData.data.auth_id);
			});
		}
	}

	getUserInfo(auth_id) {
		console.log('slammed');
		axios.get('/api/getUserInfo/' + auth_id).then((userData) => {
			this.setState({
				listingUserInfo: userData.data
			});
		});
	}

	addListingToFavorites() {
		const config = { listing_id: this.state.listingInfo.listing_id, user_id: this.props.user.user_id };
		axios.post('/api/addFavorite', config).then((response) => {
			this.props.getUserFavorites(this.props.user.user_id);
			this.favoriteIcon();
			this.setState({
				isOpen: true,
				snackbar_message: 'Listing has been added to your favorites!'
			});
		});
	}

	removeFavorite() {
		if (this.props.user) {
			axios
				.delete(`/api/removeFavorite/${this.state.listingInfo.listing_id}/${this.props.user.user_id}`)
				.then((response) => {
					this.props.getUserFavorites(this.props.user.user_id);
					this.favoriteIcon();
					this.setState({
						isOpen: true,
						snackbar_message: 'Listing has been removed from your favorites!'
					});
				});
		}
	}

	render() {
		return (
			<div className="ListingPage">
				<SnackBars is_open={this.state.isOpen} message={this.state.snackbar_message} />
				<div className="sidebar">
					<div className="leftBar">
						<div className="topMenuThing">
							<div
								style={{ backgroundColor: 'white', width: '100%', height: '80px' }}
								className="button_cursor"
								onClick={() => {
									window.history.back();
								}}>
								<Avatar style={{ backgroundColor: '#607D8B' }}>
									<Back />
								</Avatar>
							</div>
							<div style={{ backgroundColor: '#EF9A9A', width: '100%', height: '80px' }}>
								<Avatar style={{ backgroundColor: '#C62828' }}>
									<Person />
								</Avatar>
							</div>
							<div style={{ backgroundColor: 'lightblue', width: '100%', height: '80px' }}>
								<Avatar style={{ backgroundColor: 'navy' }}>
									<Inbox />
								</Avatar>
							</div>
							<div className="button_cursor">
								<div style={{ backgroundColor: '#FF9800', width: '100%', height: '80px' }}>
									<this.favoriteIcon />
								</div>
							</div>
						</div>
						<h3>Price: {this.state.listingInfo.price}</h3>
						<hr />
						<h3>Favorited: {this.state.listingInfo.favorites_count}</h3>
						<hr />
						<h3>{this.state.listingInfo.phone_number}</h3>
						<h3>{this.state.listingInfo.contact_status}</h3>
						<div className="logos">
							<img src={this.state.faceboook} alt="facebook" />
							<img src={this.state.twitter} alt="twitter" />
							<img src={this.state.gmail} alt="gmail" />
						</div>
						<hr />
						<div>
							<div className="moreFromThisSellerContainer">
								<h3>More from this seller</h3>
								<div className="moreFromThisSeller">
									{/* <img src="" /> */}
									<caption>Xbox 360</caption>
								</div>
							</div>
						</div>
					</div>
				</div>
				<section className="listing_header">
					<h1>{this.state.listingInfo.title}</h1>
					<h2>By: {this.state.listingUserInfo.username}</h2>
					<h3>Posted: 10 years ago</h3>
				</section>
				<div className="ListingInfoContainer">
					<Paper className="half1">
						{this.state.listingInfo.images.length !== 0 ? (
							<ListingImages images={this.state.listingInfo.images} />
						) : (
							<div>No Images</div>
						)}
					</Paper>
					<Paper className="half">
						<h3>{this.state.listingInfo.title}</h3>
					</Paper>
					<Paper className="full">
						<h3>Description</h3>
						<p>{this.state.listingInfo.description}</p>
					</Paper>
					<Paper className="half1">
						<h3>Pros</h3>
						<h3>{this.state.listingInfo.pros}</h3>
					</Paper>
					<Paper className="half">
						<h3>Cons</h3>
						<h3>{this.state.listingInfo.cons}</h3>
					</Paper>
				</div>
			</div>
		);
	}

	favoriteIcon() {
		let favoriteIcon = (
			<Avatar style={{ backgroundColor: 'white' }}>
				<Star
					style={{ color: '#FFFF00' }}
					onClick={() => {
						alert('Please Log In');
					}}
				/>
			</Avatar>
		);

		if (this.props.user) {
			if (this.props.favorites.length) {
				for (let index = 0; index < this.props.favorites.length; index++) {
					if (this.props.favorites[index].listing_id === this.state.listingInfo.listing_id) {
						favoriteIcon = (
							<Avatar style={{ backgroundColor: 'white' }}>
								<Star
									style={{ color: '#FFFF00' }}
									onClick={() => {
										this.removeFavorite();
									}}
								/>
							</Avatar>
						);
						break;
					} else {
						favoriteIcon = (
							<Avatar style={{ backgroundColor: 'black' }}>
								<Star
									style={{ color: 'black' }}
									onClick={() => {
										this.addListingToFavorites();
									}}
								/>
							</Avatar>
						);
					}
				}
			} else {
				favoriteIcon = (
					<Avatar style={{ backgroundColor: 'black' }}>
						<Star
							style={{ color: 'black' }}
							onClick={() => {
								this.addListingToFavorites();
							}}
						/>
					</Avatar>
				);
			}
		}
		return favoriteIcon;
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserFavorites })(ListingInfo);
