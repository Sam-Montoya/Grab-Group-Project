import React, { Component } from 'react';
import './Profile.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserInfo } from '../../../Redux/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBar from '../../SharedComponents/CategoriesBar';
import SnackBars from '../../SharedComponents/SnackBars';
import DialogBox from '../../SharedComponents/Dialog';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			snackbar_message: '',
			dialogOpen: false,
			dialog_message: 'Are you sure you want to remove this listing?',
			dialog_title: 'Remove Listing',
			selected_listing_id: '',
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

		this.coverPhotoInfo = this.coverPhotoInfo.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.props.user) {
				axios.get(`/api/getUserListings/${this.props.user.auth_id}`).then((userListings) => {
					if (Array.isArray(userListings.data)) {
						console.log('Slammed');
						this.setState({
							listings: userListings.data
						});
					}
				});
			}
		}, 500);
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

	removeListing = (listing_id) => {
		axios.delete(`/api/removeListing/${listing_id}`).then((response) => {
			this.setState({
				isOpen: true,
				snackbar_message: 'Your listing has been removed!',
				dialogOpen: false
			});
			axios.get(`/api/getUserListings/${this.props.user.auth_id}`).then((userListings) => {
				if (Array.isArray(userListings.data)) {
					this.setState({
						listings: userListings.data
					});
				}
			});
		});
		setTimeout(() => {
			this.setState({
				isOpen: false
			});
		}, 1500);
	};

	cancel(){
		this.setState({
			dialogOpen: false
		});
	}

	filter(listings) {
		for (let prop in this.state.filters) {
			if (this.state.filters[prop] !== '') {
				listings = listings.filter((listing) => {
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
		console.log(this.state, this.props);
		return (
			<div>
				<SnackBars is_open={this.state.isOpen} message={this.state.snackbar_message} />
				<DialogBox
					is_open={this.state.dialogOpen}
					message={this.state.dialog_message}
					title={this.state.dialog_title}
					removeListing={this.removeListing}
					listing_id={this.state.selected_listing_id}
					cancel={this.cancel}
				/>
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
								<h1 className="ProfileHeading">My Listings ({this.state.listings.length})</h1>
								<div className="FavoriteListingsContainer">
									{this.listingMap(this.filter(this.state.listings))}
								</div>
							</div>
						) : (
							<div className="add_listing_container">
								<h1 className="ProfileHeading">You have no listings... :(</h1>
								<Link to="/addListing">
									<section className="add_listing_button">+</section>
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

	coverPhotoInfo() {
		if (this.props.user) {
			return (
				<div className="CoverPhotoStuff">
					<div>
						<Avatar
							alt="Me"
							src={this.props.user.profile_pic}
							style={{ width: '120px', height: '120px', marginRight: '40px' }}
						/>
					</div>
					<div>
						<p style={{ fontSize: '30px' }}>{this.props.user.username}</p>
						<div class="locationProfile">
							<i class="material-icons">location_on</i>
							{this.props.user.city && this.props.user.state ? (
								<p>
									{this.props.user.city}, {this.props.user.state}
								</p>
							) : (
								<p>You havent filled out your information yet!</p>
							)}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="CoverPhotoStuff">
					<h1 style={{ fontSize: '30px' }}>Something went wrong. Please log in!</h1>
				</div>
			);
		}
	}

	listingMap(listings) {
		return listings.map((listing, i) => {
			if (listing.images) {
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
					<div>
						<div
							className="removeIcon"
							onClick={() => {
								this.setState({ dialogOpen: true, selected_listing_id: listing.listing_id });
							}}
							style={{ backgroundColor: 'red', width: '25px', height: '25px' }}>
							<hr className="deleteLine" />
						</div>
						<Link
							to={{
								pathname: '/listingInfo/' + i,
								query: listing
							}}>
							<Paper
								elevation={4}
								className="item_container"
								style={{
									background: `url(${listing.images[0]}) no-repeat center center`,
									backgroundSize: 'cover'
								}}>
								<div className="item_description" style={{ backgroundColor: backgroundColor }}>
									<h1 className="title">{listing.title}</h1>
									<hr />
									<h2 className="descriptionText">
										{listing.city}, {listing.state}
									</h2>
									<h3 className="descriptionText">{listing.price}</h3>
								</div>
							</Paper>
						</Link>
					</div>
				);
			}
		});
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { getUserInfo })(Profile);
