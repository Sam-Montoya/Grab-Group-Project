import React from 'react';
import './MyChats.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import moment from 'moment';

class MyChats extends React.Component {
	constructor() {
		super();

		this.state = {
			chats: [],
			listingData: [],
			displayedMessages: [],
			chats: '',
			listingUserData: [
				{
					profile_pic: ''
				}
			],
			messageText: '',
			currentListingId: '',
			clientInfo: [],
			scrollToBottom: function() {
				let area = document.getElementById('chat_messages_scroll');
				area.scrollTop = area.scrollHeight;
			}
		};
	}

	componentDidMount() {
		axios.get('/api/getUserChats/' + this.props.user.auth_id).then((chat) => {
			this.setState({
				chats: chat.data
			});
			for (let i = 0; i < chat.data.length; i++) {
				axios.get('/api/getListing/' + chat.data[i].listing_id).then((listingData) => {
					this.setState({
						listingData: [ ...this.state.listingData, listingData.data ]
					});
					axios.get('/api/getUserInfo/' + listingData.data.auth_id).then((userData) => {
						this.setState({
							listingUserData: userData.data
						});
					});
				});
			}
			if (chat.data[0].owner_id === this.props.user.auth_id) {
				axios.get('/api/getUserInfo/' + chat.data[0].client_id).then((clientUserData) => {
					this.setState({
						clientPic: clientUserData.data
					});
				});
			} else {
				axios.get('/api/getUserInfo/' + chat.data[0].owner_id).then((clientUserData) => {
					this.setState({
						clientPic: clientUserData.data
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
		setTimeout(() => {
			this.state.scrollToBottom();
		}, 0.2);
	};

	onSubmit = (message) => {
		let chatObj = {
			auth_id_of_comment: this.props.user.auth_id,
			// client_id: this.state.listingUserData.auth_id,
			message: message,
			time_submitted: Date(Date.now())
		};
		axios.post('/api/addMessage/' + this.state.currentListingId, chatObj).then((res) => {
			axios.get('/api/getUserChats/' + this.props.user.auth_id).then((chat) => {
				this.setState({
					chats: chat.data
				});
				this.getChatsToDisplay(this.state.currentListingId);
			});
		});
	};

	render() {
		console.log(this.state);
		let listingPictures;
		if (this.state.listingData.length) {
			listingPictures = this.state.listingData.map((elem, i) => {
				return (
					<section className="listings_chat_avatar_container">
						<Avatar
							className="listings_chat_avatar"
							key={i}
							onClick={() => {
								this.getChatsToDisplay(elem.listing_id);
								this.setState({
									currentListingId: elem.listing_id
								});
							}}>
							<img style={{ height: '100%' }} src={elem.images[0]} alt="" />
						</Avatar>
					</section>
				);
			});
		}
		return (
			<div className="chats_container">
				<section className="chats_listings">{listingPictures}</section>
				<section className="chats_messages_container">
					<div style={{ width: '100%', height: '70vh', overflow: 'scroll' }} id="chat_messages_scroll">
						{this.messageContainer()}
					</div>
					<div className="chats_inputbox_container">
						<textarea
							onChange={(text) => {
								this.setState({
									messageText: text.target.value
								});
							}}
							placeholder="Type a message..."
						/>
						<button
							onClick={() => {
								this.onSubmit(this.state.messageText);
							}}>
							Submit
						</button>
					</div>
				</section>

				<section className="chats_profile_container">
					<Avatar className="listings_profile_avatar">
						{this.state.clientPic ? (
							<img style={{ height: '100%' }} src={this.state.clientPic.profile_pic} alt="" />
						) : null}
					</Avatar>
					{this.state.clientPic ? (
						<h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{this.state.clientPic.username}</h1>
					) : null}
					<Button className="View_Profile_Button">View Listings</Button>
				</section>
			</div>
		);
	}

	messageContainer = () => {
		if (this.state.displayedMessages !== null) {
			let chats = this.state.displayedMessages.map((elem, i) => {
				console.log(elem.auth_id_of_comment + '  DOES === ' + this.props.user.auth_id);
				if (elem.auth_id_of_comment === this.props.user.auth_id) {
					console.log('Owner');
					return (
						<div key={i} className="left_comment_container">
							<section className="left_message_container">
								<section className="left_message">
									<h1>{elem.message}</h1>
								</section>
								<section className="right_time_submitted">
									<h1>{moment(elem.time_submitted).fromNow()}</h1>
								</section>
							</section>
							<img className="profile_pic" src={this.props.user.profile_pic} alt="" />
						</div>
					);
				} else {
					console.log('Client', this.state.clientPic);
					return (
						<div key={i} className="right_comment_container">
							{this.state.clientPic ? (
								<img className="profile_pic" src={this.state.clientPic.profile_pic} alt="" />
							) : null}
							<section className="right_message_container">
								<section className="right_message">
									<h1>{elem.message}</h1>
								</section>
								<section className="left_time_submitted">
									<h1>{moment(elem.time_submitted).fromNow()}</h1>
								</section>
							</section>
						</div>
					);
				}
			});
			return chats;
		}
	};
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(MyChats);
