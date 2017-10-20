import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './MyFavorites.css';
import Inbox from 'material-ui-icons/Message';
import Pageview from 'material-ui-icons/Pageview';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';
import Avatar from 'material-ui/Avatar';

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';
import Paper from 'material-ui/Paper';

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
		axios.get('http://localhost:3060/api/getUserListings').then((res) => {
			this.setState({
				listings: res.data
			});
		});
	}

	handleChangeInput = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	render() {
		let color1 = 'rgba(0, 137, 54, 0.5';
		let color2 = 'rgba(46, 29, 138, 0.5';
		let color3 = 'rgba(46, 138, 138, .5)';

		let myFavorites = this.props.favorites.map((favorite, i) => {
			if (favorite.images)
				return (
					<div>
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
		});


		return (
			<div>
				<div className="myFavoritesPageContainer">
					{/* <div className="leftNavFavorites">
						<div className="LinkIconsonLeft"> */}
					{/* <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#455A64', height: '60px', width: '60px' }}>
                                    <Back />
                                </Avatar>
                            </div>

                            <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#C62828', height: '60px', width: '60px' }}>
                                    <Person />
                                </Avatar>
                            </div>


                            <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: 'navy', height: '60px', width: '60px' }}>
                                    <Inbox />
                                </Avatar>
                            </div>


                            <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#E65100', height: '60px', width: '60px' }}>
                                    <Star />
                                </Avatar>
                            </div> */}
					{/* 
						</div>
					</div> */}

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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(MyFavorites);
