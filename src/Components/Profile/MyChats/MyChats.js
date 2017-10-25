import React from 'react';
import './MyChats.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';

class MyChats extends React.Component {
	constructor() {
		super();

		this.state = {
			chats: [],
			listingData: [],
			displayedMessages: [],
			chats: '',
			listingUserData: [],
			messageText: '',
			currentListingId: '',
			currentPosition: 0,
			clientInfo: [],
			userSideInfo: <div />,
			scrollToBottom: function() {
				let area = document.getElementById('chat_messages_scroll');
				area.scrollTop = area.scrollHeight;
			}
		};
	}

	getUserChats = () => {
		axios.get('/api/getUserChats/' + this.props.user.auth_id).then((chat) => {
			console.log(chat.data);
			this.setState({
				chats: chat.data
			}),
				this.getListingInfo();
		});
	};

	getListingInfo = () => {
		function ownerChecker(i, listingData) {
			console.log(this.state);
			console.log(listingData.data);
			if (listingData.data.auth_id === this.props.user.auth_id) {
				this.getUserInfo(this.state.chats[i].client_id);
			} else {
				this.getUserInfo(listingData.data.auth_id);
			}
		}
		ownerChecker = ownerChecker.bind(this);

		for (let i = 0; i < this.state.chats.length; i++) {
			console.log(i);
				axios.get('/api/getListing/' + this.state.chats[i].listing_id).then((listingData) => {
					this.setState({
						listingData: [ ...this.state.listingData, listingData.data ]
					}),
						ownerChecker(i, listingData);
				});
		}
	};

	getUserInfo = (auth_id) => {
		console.log(auth_id);
		axios.get('/api/getUserInfo/' + auth_id).then((userData) => {
			console.log(userData.data);
			this.setState({
				listingUserData: [ ...this.state.listingUserData, userData.data ]
			});
		});
	};

	componentDidMount() {
		this.getUserChats();
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
			this.setUserSideInfo();
		}, 0.2);
	};

	onSubmit = (message) => {
		let chatObj = {
			auth_id_of_comment: this.props.user.auth_id,
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
					<section key={i} className="listings_chat_avatar_container">
						<Avatar
							className="listings_chat_avatar"
							onClick={() => {
								this.setState({
									currentListingId: elem.listing_id,
									currentPosition: i
								}),
									this.getChatsToDisplay(elem.listing_id);
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
				{this.state.userSideInfo}
			</div>
		);
	}

	setUserSideInfo = () => {
		this.setState({
			userSideInfo: (
				<section className="chats_profile_container">
					<Avatar className="listings_profile_avatar">
						{this.state.listingUserData ? (
							<img
								style={{ height: '100%' }}
								src={this.state.listingUserData[this.state.currentPosition].profile_pic}
								alt=""
							/>
						) : null}
					</Avatar>
					{this.state.listingUserData ? (
						<h1 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
							{this.state.listingUserData[this.state.currentPosition].username}
						</h1>
					) : null}
					{this.state.listingUserData ? (
						<Link
							to={{
								pathname:
									'/ownerProfile/' + this.state.listingUserData[this.state.currentPosition].user_id,
								user_id: this.state.listingUserData[this.state.currentPosition].user_id
							}}>
							<Button className="View_Profile_Button">View Listings</Button>
						</Link>
					) : null}
				</section>
			)
		});
	};

	messageContainer = () => {
		if (this.state.displayedMessages !== null) {
			let chats = this.state.displayedMessages.map((elem, i) => {
				if (elem.auth_id_of_comment === this.props.user.auth_id) {
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
					console.log('should be twan ', this.state.listingUserData[this.state.currentPosition]);
					return (
						<div key={i} className="right_comment_container">
							{this.state.listingUserData ? (
								<img
									className="profile_pic"
									src={this.state.listingUserData[this.state.currentPosition].profile_pic}
									alt=""
								/>
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
