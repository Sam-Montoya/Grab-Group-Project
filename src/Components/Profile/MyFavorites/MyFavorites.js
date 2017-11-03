import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyFavorites.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserFavorites } from '../../../Redux/reducer';
import CategoriesBar from '../../SharedComponents/CategoriesBar';
import SnackBars from '../../SharedComponents/SnackBars';
import DialogBox from '../../SharedComponents/Dialog';

class MyFavorites extends Component {
	constructor() {
		super();
		this.state = {
			listings: [],
			checkedA: false,
			checkedB: false,
			checkedC: false,
			checkedD: false,
			checkedE: false,
			isOpen: false,
			snackbar_message: '',
			dialogOpen: false,
			dialog_message: 'Are you sure you want to remove this listing from your favorites?',
			dialog_title: 'Remove from Favorites',
			selected_listing_id: '',
			filters: {
				checkedA: '',
				checkedB: '',
				checkedC: '',
				checkedD: '',
				checkedE: ''
			}
		};
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		axios.get('/api/getUserFavorites/' + this.props.user.user_id).then((res) => {
			this.setState({
				listings: res.data
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

	removeFavorite = (listing_id) => {
		axios.delete(`/api/removeFavorite/${listing_id}/${this.props.user.user_id}`)
			.then((response) => {
				this.setState({
					isOpen: true,
					snackbar_message: 'Listing has been removed from your favorites!',
					dialogOpen: false
				})
				this.props.getUserFavorites(this.props.user.user_id);
			}).then((newFavorites) => {
				axios.get('/api/getUserFavorites/' + this.props.user.user_id).then((res) => {
					this.setState({
						listings: res.data
					});
				});
			})
		setTimeout(() => {
			this.setState({
				isOpen: false
			})
		}, 1500);
	}

	cancel(){
		this.setState({
			dialogOpen: false
		})
	}

	filter(listings) {
		for (let prop in this.state.filters) {
			if (this.state.filters[prop] !== '') {
				listings = listings.filter(listing => {
					for (let prop in this.state.filters) {
						if (listing.category === this.state.filters[prop]) {
							return listing;
						}
					}
					return true;
				});
			}
		}
		return listings;
	}

	render() {
		return (
			<div >
				<SnackBars is_open={this.state.isOpen} message={this.state.snackbar_message} />
				<DialogBox is_open={this.state.dialogOpen} message={this.state.dialog_message} title={this.state.dialog_title} removeFavorite={this.removeFavorite} listing_id={this.state.selected_listing_id} cancel={this.cancel} />
				<div className="myFavoritesPageContainer">
					<div className="MainContentFavorites">
						<h1 className="FavoritesPageHeading">My Favorites Page</h1>
						<div className="FavoriteListingsContainer">{this.favoritesMap(this.filter(this.state.listings))}</div>
					</div>

					<div className="Chat">
						<Avatar style={{ backgroundColor: '#03A9F4', height: '60px', width: '60px' }}>
							<Inbox />
						</Avatar>
					</div>

					<div className="rightNavFavorites">
						<CategoriesBar {...this.state} handleChangeInput={this.handleChangeInput} />
					</div>
				</div>
			</div >
		);
	}

	favoritesMap(listing) {
		return listing.map((listing, i) => {
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
							<div className="removeIcon" onClick={() => this.removeFavorite(listing.listing_id)} style={{ backgroundColor: 'red', width: '25px', height: '25px' }}><hr className="deleteLine"></hr></div>
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
			return this;
		});
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserFavorites })(MyFavorites);
