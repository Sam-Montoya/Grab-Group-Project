import React, { Component } from 'react';
import ListingImages from './listingImages';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Inbox from 'material-ui-icons/Message';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';
import Contact from 'material-ui-icons/ContactPhone';
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
			newPrice: '',
			listingUserInfo: {},
			twitter: require('../../images/TwitterLogo2.png'),
			gmail: require('../../images/mailLogo.png'),
			faceboook: require('../../images/fbLogo.png'),
			isFavorite: false,
			isOpen: false,
			snackbar_message: '',
			favorites_count: 0
		};
		this.favoriteIcon = this.favoriteIcon.bind(this);
	}

	componentDidMount() {
		let listingNumber = this.props.location.pathname;
		listingNumber = listingNumber.split('/');
		listingNumber = listingNumber[2];

		if (this.props.location.query) {
			this.setState({
				listingInfo: this.props.location.query,
				newPrice: this.props.location.query.price.slice(1, this.props.location.query.length),
				favorites_count: this.props.location.query.favorites_count
			});
			this.getUserInfo(this.props.location.query.auth_id);
		} else {
			axios.get('/api/getListing/' + listingNumber).then((listingData) => {
				this.setState({
					listingInfo: listingData.data,
					newPrice: listingData.data.price.slice(1, listingData.data.price.length),
					favorites_count: listingData.data.favorites_count
				});
				this.getUserInfo(listingData.data.auth_id);
			});
		}
	}

	getUserInfo(auth_id) {
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
				snackbar_message: 'Listing has been added to your favorites!',
				favorites_count: this.state.favorites_count + 1
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
						snackbar_message: 'Listing has been removed from your favorites!',
						favorites_count: this.state.favorites_count - 1
					});
				});
		}
	}

	render() {
		return (
			<div className="ListingPage">
				<SnackBars is_open={this.state.isOpen} message={this.state.snackbar_message} />
				<div className="listing_sidebar">
					<div className="user_tools">
						<div
							onClick={() => {
								window.history.back();
							}}>
							<Avatar className="listing_avatar listing_back">
								<Back />
							</Avatar>
						</div>
						<div>
							<Avatar className="listing_avatar listing_profile">
								<Person />
							</Avatar>
						</div>
						<div>
							<Avatar className="listing_avatar listing_message">
								<Inbox />
							</Avatar>
						</div>
						<div>
							<this.favoriteIcon />
						</div>
					</div>
					<div className="listing_user_info">
						<section className="listing_price_container">
							<div>$</div>
							<section className="listing_price_info">
								<h3>{this.state.newPrice}</h3>
							</section>
						</section>
						<section className="listing_favorites_container">
							<div>
								<Star className="listing_favorites_star" />
							</div>
							<section className="listing_favorites_info">
								<h3>{this.state.favorites_count}</h3>
							</section>
						</section>

						<section className="listing_contact_container">
							<div>
								<Contact className="listing_contact_icon" />
							</div>
							<section className="listing_contact_info">
								<h3 style={{ fontWeight: 'bold' }}>{this.state.listingInfo.contact_status}</h3>
								{this.state.listingInfo.phone_number ? (
									<h3>{this.state.listingInfo.phone_number}</h3>
								) : null}
							</section>
						</section>

						<div className="logos">
							<img src={this.state.faceboook} alt="facebook" />
							<img src={this.state.twitter} alt="twitter" />
							<img src={this.state.gmail} alt="gmail" />
						</div>
						{/* <hr /> */}
					</div>
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
				<section className="listing_header">
					<h1>{this.state.listingInfo.title}</h1>
					<h2>By: {this.state.listingUserInfo.username}</h2>
					<h3>Posted: 10 years ago</h3>
				</section>
				<div className="ListingInfoContainer">
					<Paper className="half1">
						<ListingImages images={this.state.listingInfo.images} />
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
		let favoriteIcon_Login = (
			<Avatar className="listing_avatar favorite_icon_add">
				<Star
					onClick={() => {
						alert('Please Log In');
					}}
				/>
			</Avatar>
		);

		let favoriteIcon_Remove = (
			<Avatar className="listing_avatar favorite_icon_remove">
				<Star
					onClick={() => {
						this.removeFavorite();
					}}
				/>
			</Avatar>
		);

		let favoriteIcon_Add = (
			<Avatar className="listing_avatar favorite_icon_add">
				<Star
					onClick={() => {
						this.addListingToFavorites();
					}}
				/>
			</Avatar>
		);

		if (this.props.user) {
			if (this.props.favorites.length) {
				for (let index = 0; index < this.props.favorites.length; index++) {
					if (this.props.favorites[index].listing_id === this.state.listingInfo.listing_id) {
						return favoriteIcon_Remove;
						break;
					} else {
						return favoriteIcon_Add;
					}
				}
			} else {
				return favoriteIcon_Add;
			}
		}
		return favoriteIcon_Login;
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserFavorites })(ListingInfo);
