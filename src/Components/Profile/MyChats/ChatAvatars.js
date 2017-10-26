import React from 'react';
import './ChatAvatars.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ChatAvatars extends React.Component {
	constructor() {
		super();

		this.state = {
			owner_id: 'google-oauth2|105313138391043301759',
			client_id: 'google-oauth2|111891641192346730945',
			listing_id: 44,
			userChats: [],
			avatarPictures: []
			// scrollToBottom: function () {
			// 	let area = document.getElementById('chat_messages_scroll');
			// 	area.scrollTop = area.scrollHeight;
		};
	}

	componentDidMount() {
		// if (this.props.location.chatInfo) {
		// 	this.setState({
		// 		owner_id: this.props.location.chatInfo.owner_id,
		// 		client_id: this.props.location.chatInfo.client_id,
		// 		listing_id: this.props.location.chatInfo.listing_id
		// 	})
		// } else {}
		axios.get('/api/getUserChats/' + this.state.client_id).then((userData) => {
			this.setState({
				userChats: userData.data
			});
			userData.data.map((chat, i) => {
				axios.get('/api/getListing/' + chat.listing_id).then((listingData) => {
					this.setState({
						avatarPictures: [ ...this.state.avatarPictures, listingData.data.images[0] ]
					});
				});
			});
		});
	}

	render() {
		console.log('STATE ', this.state);
		return (
			<div className="chats_container">
				<section className="chats_listings">{this.renderChatAvatars()}</section>
				{/* <section className='chats_messages_container'>
					<div style={{ width: '100%', height: '70vh', overflow: 'scroll' }} id='chat_messages_scroll'></div>
					<div className='chats_inputbox_container'>
						<textarea
							placeholder='Type a message here..'
						/>
						<button>Submit</button>
					</div>
				</section> */}
			</div>
		);
	}
	renderChatAvatars = () => {
		if (this.state.userChats.length) {
			return this.state.avatarPictures.map((picture, index) => {
				return (
					<section key={index} className="listings_chat_avatar_container">
						<Avatar className="listings_chat_avatar">
							<img style={{ height: '100%' }} src={picture} alt="" />
						</Avatar>
					</section>
				);
			});
		}
	};
}
function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(ChatAvatars);
