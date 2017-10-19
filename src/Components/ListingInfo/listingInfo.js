import React, { Component } from 'react';
import ListingImages from './listingImages';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Inbox from 'material-ui-icons/Message';
import Pageview from 'material-ui-icons/Pageview';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';

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
			twitter: require('../../images/TwitterLogo2.png'),
			gmail: require('../../images/mailLogo.png'),
			faceboook: require('../../images/fbLogo.png')
		};
	}

	componentDidMount() {
		if (this.props.location.query) {
			console.log('IM HIT');
			this.setState({
				listingInfo: this.props.location.query
			});
		}
	}

	render() {
		console.log(this.state.listingInfo);
		return (
			<div className="ListingPage">
				<div className="sidebar">
					<div className="leftBar">
						<div className="topMenuThing">
							<a href="#">
								<div style={{ backgroundColor: 'white', width: '100%', height: '80px' }}>
									<Avatar style={{ backgroundColor: '#607D8B' }}>
										<Back />
									</Avatar>
								</div>
							</a>
							<a href="#">
								<div style={{ backgroundColor: '#EF9A9A', width: '100%', height: '80px' }}>
									<Avatar style={{ backgroundColor: '#C62828' }}>
										<Person />
									</Avatar>
								</div>
							</a>
							<a href="#">
								<div style={{ backgroundColor: 'lightblue', width: '100%', height: '80px' }}>
									<Avatar style={{ backgroundColor: 'navy' }}>
										<Inbox />
									</Avatar>
								</div>
							</a>
							<a href="#">
								<div style={{ backgroundColor: '#FF9800', width: '100%', height: '80px' }}>
									<Avatar style={{ backgroundColor: '#E65100' }}>
										<Star />
									</Avatar>
								</div>
							</a>
						</div>
						<h3>Price: {this.state.listingInfo.price}</h3>
						<hr />
						<h3>Favorited: COMING SOON</h3>
						<hr />
						<h3>{this.state.listingInfo.phone_number}</h3>
						<h3>{this.state.listingInfo.contact_status}</h3>
						<div className="logos">
							<img src={this.state.faceboook} />
							<img src={this.state.twitter} />
							<img src={this.state.gmail} />
						</div>
						<hr />
						<div>
							<div className="moreFromThisSellerContainer">
								<h3>More from this seller</h3>
								<div className="moreFromThisSeller">
									<img src="" />
									<caption>Xbox 360</caption>
								</div>
							</div>
						</div>
					</div>
				</div>
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
}

export default ListingInfo;
