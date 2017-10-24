import React from 'react';
import './MyChats.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';

export default class MyChats extends React.Component {
	constructor() {
		super();

		this.state = {
			chats: [],
			listingData: [],
			displayedMessages: [],
			user_id: 'auth_id_1'
		};
	}

	componentDidMount() {
		axios.get('/api/getUserChats/auth_id_1').then((chat) => {
			this.setState({
				chats: chat.data
			});
			for (let i = 0; i < chat.data.length; i++) {
				axios.get('/api/getListing/' + chat.data[i].listing_id).then((listingData) => {
					this.setState({
						listingData: [ ...this.state.listingData, listingData.data ]
					});
				});
			}
		});
	}

	getChatsToDisplay = (listing_id) => {
		this.state.chats.map((elem, id) => {
			if (listing_id === elem.listing_id) {
				this.setState({
					displayedMessages: elem.messages
				});
			}
		});
	};

	render() {
		console.log(this.state);

		let listingPictures;
		if (this.state.listingData.length) {
			listingPictures = this.state.listingData.map((elem, i) => {
				return (
					<Avatar
						className="listings_chat_avatar"
						key={i}
						onClick={() => {
							this.getChatsToDisplay(elem.listing_id);
						}}
						size={200}>
						<img style={{ height: '100%' }} src={elem.images[0]} alt="" />
					</Avatar>
				);
			});
		}

		let chats = this.state.displayedMessages.map((elem, i) => {
			return (
				<div
					key={i}
					className={
						elem.auth_id_of_comment === this.state.user_id ? (
							'right_comment_container'
						) : (
							'left_comment_container'
						)
					}>
					<section
						className={elem.auth_id_of_comment === this.state.user_id ? 'right_message' : 'left_message'}>
						<h1>{elem.message}</h1>
					</section>
					<img
						className="profile_pic"
						src={
							'https://lh3.googleusercontent.com/-QnkVbgp55Qc/AAAAAAAAAAI/AAAAAAAAAAc/5BT-Kmh3oSg/photo.jpg'
						}
						alt=""
					/>
				</div>
			);
		});

		return (
			<div className="chats_container">
				<section className="chats_listings">{listingPictures}</section>

				<section className="chats_messages_container">{chats}</section>

				<section className="chats_profile_container">
					<h1>Profile Info</h1>
				</section>
			</div>
		);
	}
}
