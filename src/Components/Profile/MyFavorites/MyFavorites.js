import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyFavorites.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
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
			<div >
				<SnackBars is_open={this.state.isOpen} message={this.state.snackbar_message} />
				<DialogBox is_open={this.state.dialogOpen} message={this.state.dialog_message} title={this.state.dialog_title} removeFavorite={this.removeFavorite} listing_id={this.state.selected_listing_id} />
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

	favoritesMap(favorites) {
		return favorites.map((favorite, i) => {
			if (favorite.images) {
				let backgroundColor;
				switch (favorite.category) {
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
						<div className="removeIcon" onClick={() => this.setState({dialogOpen: true, selected_listing_id: favorite.listing_id})} style={{ backgroundColor: 'red', width: '25px', height: '25px' }}><hr className="deleteLine"></hr></div>

						<Link
							to={{
								pathname: '/listingInfo/' + favorite.listing_id,
								query: favorite
							}}>
							<Paper
								elevation={4}
								className="item_container"
								style={{
									background: `url(${favorite.images[0]}) no-repeat center center`,
									backgroundSize: 'cover'
								}}>
								<div
									className="item_description"
									style={{ backgroundColor: backgroundColor }}>
									<h1 className="title">{favorite.title}</h1>
									<hr />
									<h2 className="descriptionText">{favorite.city}, {favorite.state}</h2>
									<h3 className="descriptionText">{favorite.price}</h3>
								</div>
							</Paper>
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
