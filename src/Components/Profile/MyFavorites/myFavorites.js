import React, { Component } from 'react';
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
		console.log('MOUNTED');
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

		let listings = this.state.listings.map((elem, i) => {
			console.log(elem);
			var x = Math.floor(Math.random() * 3 + 1);
			if (elem.image)
				return (
					<div>
						<a href="http://localhost:3000/#/listinginfo">
							<Paper
								elevation={4}
								className="Item"
								style={{
									width: '200px',
									height: '200px',
									margin: 'auto',
									margin: '20px',
									background: `url(${elem.image}) no-repeat center center`,
									backgroundSize: 'cover'
								}}>
								<Avatar
									style={{ backgroundColor: 'lightblue', width: '30px', height: '30px' }}
									className="removeIcon">
									<div
										style={{
											backgroundColor: 'tomato',
											width: '30px',
											height: '30px',
											paddingTop: '7px',
											paddingLeft: '11px'
										}}>
										-
									</div>
								</Avatar>
								<div
									className="description"
									style={{ backgroundColor: x === 1 ? color1 : x === 2 ? color2 : color3 }}>
									<p className="title">{elem.title}</p>
									<p className="descriptionText"> {elem.desc}</p>
								</div>
							</Paper>
						</a>
					</div>
				);
		});

		return (
			<div>
				<div className="myFavoritesPageContainer">
					<div className="leftNavFavorites">
						<div className="LinkIconsonLeft">
							<div style={{ backgroundColor: '#CFD8DC', width: '100%', height: '25%' }}>
								<Avatar style={{ backgroundColor: '#455A64', height: '90px', width: '90px' }}>
									<Back />
								</Avatar>
							</div>

							<div style={{ backgroundColor: '#EF9A9A', width: '100%', height: '25%' }}>
								<Avatar style={{ backgroundColor: '#C62828', height: '90px', width: '90px' }}>
									<Person />
								</Avatar>
							</div>

							<div style={{ backgroundColor: '#81D4FA', width: '100%', height: '25%' }}>
								<Avatar style={{ backgroundColor: 'navy', height: '90px', width: '90px' }}>
									<Inbox />
								</Avatar>
							</div>

							<div style={{ backgroundColor: '#FFCC80', width: '100%', height: '25%' }}>
								<Avatar style={{ backgroundColor: '#E65100', height: '90px', width: '90px' }}>
									<Star />
								</Avatar>
							</div>
						</div>
					</div>
					<div className="MainContentFavorites">
						<h1>My Favorites Page</h1>
						<div className="FavoriteListingsContainer">{listings}</div>
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

export default MyFavorites;
