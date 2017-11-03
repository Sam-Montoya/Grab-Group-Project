import React from 'react';
import './ChatAvatars.css';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import MessagesContainer from './Messages';

class ChatAvatars extends React.Component {
	constructor() {
		super();

		this.state = {
			owner_id: '',
			client_id: '',
			listing_id: null,
			userChats: [],
			avatarPictures: [],
			chatClicked: false,
			currentUserChat: [],
			currentIndex: null
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
		axios.get('/api/getUserChats/' + this.props.user.auth_id).then((userData) => {
			userData.data.map((chat, i) => {
				axios.get('/api/getListing/' + chat.listing_id).then((listingData) => {
					let newChat = { userData: userData.data[i], listingData }
					this.setState({
						userChats: [...this.state.userChats, newChat]
					});
				});
				return true;
			});
		});
	}

	renderChat = (userChats, currentIndex) => {
		this.setState({
			chatClicked: true,
			currentUserChat: userChats,
			currentIndex: currentIndex
		});
	};

	updateCurrentMessage = (messages) => {
		let tempArr = this.state.userChats;
		tempArr[this.state.currentIndex].userData.messages = messages;
		this.setState({
			userChats: tempArr
		})
	}

	render() {
		console.log(this.state);
		return (
			<div className="chats_container">
				<section className="chats_listings">{this.renderChatAvatars()}</section>
				{this.state.chatClicked ? <MessagesContainer chatData={this.state.currentUserChat} updateMessage={this.updateCurrentMessage} listingData={this.state.userChats[this.state.currentIndex]} /> : <h1>Click on a chat!</h1>}
			</div>
		);
	}


	renderChatAvatars = () => {
		if (this.state.userChats.length) {
			return this.state.userChats.map((chat, index) => {
				return (
					<section key={index} className="listings_chat_avatar_container">
						{
							chat.userData.notification ?
								<section className='notication_circle' />
								:
								<h1>No</h1>
						}
						<Avatar
							className="listings_chat_avatar"
							onClick={() => this.renderChat(this.state.userChats[index].userData, index)}>
							<img style={{ height: '100%' }} src={chat.listingData.data.images[0]} alt="" />
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
