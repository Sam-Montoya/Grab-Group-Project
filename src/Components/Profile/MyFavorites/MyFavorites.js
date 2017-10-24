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

class MyFavorites extends Component {
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
	}

	componentDidMount() {
		axios.get('/api/getUserListings/' + this.props.user.user_id).then((res) => {
			this.setState({
				listings: res.data
			});
		});
	}

	handleChangeInput = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	removeFavorite = (listing_id) => {
		axios.delete(`/api/removeFavorite/${listing_id}/${this.props.user.user_id}`)
			.then((response) => {
				alert('Listing has been removed from your favorites');
				this.props.getUserFavorites(this.props.user.user_id);
			})
	}

	render() {
				let myFavorites = this.props.favorites.map((favorite, i) => {
					if (favorite.images)
						return (
							<div>
								<div className="removeIcon" onClick={() => this.removeFavorite(favorite.listing_id)} style={{ backgroundColor: 'red', width: '25px', height: '25px' }}><hr className="deleteLine"></hr></div>

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
											style={{ backgroundColor: 'rgba(53, 138, 255, 0.68)' }}>
											<h1 className="title">{favorite.title}</h1>
											<hr />
											<h2 className="descriptionText">{favorite.city}, {favorite.state}</h2>
											<h3 className="descriptionText">{favorite.price}</h3>
										</div>
									</Paper>
								</Link>
							</div>
						);
					return this;
				});

				return(
			<div >
			<div className="myFavoritesPageContainer">
				<div className="MainContentFavorites">
					<h1 className="FavoritesPageHeading">My Favorites Page</h1>
					<div className="FavoriteListingsContainer">{myFavorites}</div>
				</div>

				<div className="Chat">
					<Avatar style={{ backgroundColor: '#03A9F4', height: '60px', width: '60px' }}>
						<Inbox />
					</Avatar>
				</div>

				<div className="rightNavFavorites">
					<div className="categories">
						<p>Categories</p>
						<div>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedA}
										onChange={this.handleChangeInput('checkedA')}
										value="checkedA"
										style={{ color: 'red' }}
									/>
								}
								label="Electronics"
							/>
						</div>
						<div>
							<FormControlLabel
								control={
									<Checkbox
										checked={this.state.checkedB}
										onChange={this.handleChangeInput('checkedB')}
										value="checkedB"
										style={{ color: 'Purple' }}
									/>
								}
								label="Home"
							/>
						</div>
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
			</div>
			</div >
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { getUserFavorites })(MyFavorites);
