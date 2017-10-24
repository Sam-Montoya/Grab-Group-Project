import React, { Component } from 'react';
import './Profile.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserInfo } from '../../../Redux/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBar from '../../SharedComponents/CategoriesBar';

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			listings: [],
			checkedA: false,
			checkedB: false,
			checkedC: false,
			checkedD: false,
			checkedE: false
		};

		this.coverPhotoInfo = this.coverPhotoInfo.bind(this);
	}

	componentDidMount() {
		if (this.props.user) {
			axios.get(`/api/getUserListings/${this.props.user.auth_id}`).then((userListings) => {
				if (Array.isArray(userListings.data)) {
					this.setState({
						listings: userListings.data
					});
				}
			});
		}
	}

	handleChangeInput = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	removeListing = (listing_id) => {
		axios.delete(`/api/removeListing/${listing_id}`).then((response) => {
			alert('Listing has been removed');
			axios.get(`/api/getUserListings/${this.props.user.auth_id}`).then((userListings) => {
				if (Array.isArray(userListings.data)) {
					this.setState({
						listings: userListings.data
					});
				}
			});
		});
	};

	render() {
		let listings;
		if (this.state.listings.length) {
			listings = this.state.listings.map((elem, i) => {
				if (elem.images)
					return (
						<div>
							<div
								className="removeIcon"
								onClick={() => this.removeListing(elem.listing_id)}
								style={{ backgroundColor: 'red', width: '25px', height: '25px' }}>
								<hr className="deleteLine" />
							</div>
							<Link
								to={{
									pathname: '/listingInfo/' + i,
									query: elem
								}}>
								<Paper
									elevation={4}
									className="item_container"
									style={{
										background: `url(${elem.images[0]}) no-repeat center center`,
										backgroundSize: 'cover'
									}}>
									<div
										className="item_description"
										style={{ backgroundColor: 'rgba(53, 138, 255, 0.68)' }}>
										<h1 className="title">{elem.title}</h1>
										<hr />
										<h2 className="descriptionText">
											{elem.city}, {elem.state}
										</h2>
										<h3 className="descriptionText">{elem.price}</h3>
									</div>
								</Paper>
							</Link>
						</div>
					);
			});
		}

		return (
			<div>
				<div className="ProfilePageContainer">
					<div className="rightNavFavorites">
						{/* Search Categories Function */}
						{CategoriesBar('electronics', 'home', 'sports', 'parts', 'free')}
					</div>
					<div className="MainContentProfile">
						<div className="CoverPhoto">
							{/* Cover Photo JSX */}
							<this.coverPhotoInfo />
						</div>

						{this.state.listings.length ? (
							<div>
								<h1 className="ProfileHeading">My Listings ({this.state.listings.length})</h1>
								<div className="FavoriteListingsContainer">{listings}</div>
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
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { getUserInfo })(Profile);
