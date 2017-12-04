import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './ChatAvatars.css';
import ChatInfo from './ChatInfo'

class Messages extends React.Component {
	constructor() {
		super();

		this.state = {
			client_id: '',
			client_info: {},
			owner_id: '',
			owner_info: {},
			listing_id: null,
			messages: []
		};
	}
	componentDidMount() {
		this.setState(
			{
				client_id: this.props.chatData.client_id,
				owner_id: this.props.chatData.owner_id,
				listing_id: this.props.chatData.listing_id,
				messages: this.props.chatData.messages,
				messageText: '',
				messageIndex: this.props.currentIndex,
				listingData: this.props.listingData.listingData.data
			},
			() => {
				this.getClientInfo();
				var objDiv = document.getElementById("chat_messages_scroll");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		);

		let notificationInfo = {
			owner_id: this.props.chatData.owner_id,
			client_id: this.props.chatData.client_id,
			auth_id: this.props.user.auth_id,
			listing_id: this.props.listingData.listingData.data.listing_id
		}
		axios.put('/api/updateNotificationCount', notificationInfo).then(response => {
			console.log(response);
		})
		setInterval(() => {
			axios.get('/api/getUserChats/' + this.props.user.auth_id).then(messages => {
				let chatToRender = messages.data.filter((chats) => {
					return chats.owner_id === this.state.owner_id && chats.client_id === this.state.client_id && chats.listing_id === this.state.listing_id
				})
				this.setState({
					messages: chatToRender[0].messages
				})
				this.props.updateMessage(chatToRender[0]);
			})
		}, 5000)
	}
	componentWillReceiveProps(nextProps) {
		this.setState(
			{
				client_id: nextProps.chatData.client_id,
				owner_id: nextProps.chatData.owner_id,
				listing_id: nextProps.chatData.listing_id,
				messages: nextProps.chatData.messages,
				messageIndex: nextProps.currentIndex,
				listingData: nextProps.listingData.listingData.data
			},
			() => {
				this.getClientInfo();
				var objDiv = document.getElementById("chat_messages_scroll");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		);
	}

	render() {
		return (
			<div className='chat_container'>
				<section className="chats_messages_container">
					<div className="chats_all_messages" id="chat_messages_scroll">
						{this.renderMessages()}
					</div>
					<div className="chats_inputbox_container">
						<textarea
							onChange={(text) => this.setState({ messageText: text.target.value })}
							placeholder="Type a message here.."
							id='text_box'
						/>
						<button onClick={() => this.submitMessage()}>Submit</button>
					</div>
				</section>
				<section>
					{this.state.listingData ?
						<ChatInfo listingData={this.state.listingData} userData={this.state.owner_info} />
						: null
					}
				</section>
			</div>
		);
	}

	getClientInfo = () => {
		if (this.props.user.auth_id === this.state.owner_id) {
			axios.get('/api/getUserInfo/' + this.state.client_id).then((userData) => {
				this.setState({
					owner_info: userData.data,
					client_info: this.props.user
				});
			});
		} else {
			axios.get('/api/getUserInfo/' + this.state.owner_id).then((userData) => {
				this.setState({
					owner_info: userData.data,
					client_info: this.props.user
				});
			});
		}
	};

	submitMessage = () => {
		//View that single listing

		let chatObj = {
			auth_id_of_comment: this.props.user.auth_id,
			owner_id: this.state.owner_id,
			client_id: this.state.client_id,
			message: this.state.messageText,
			time_submitted: new Date(Date.now())
		};
		axios.post('/api/addMessage/' + this.state.listing_id, chatObj).then((messages) => {
			this.setState({
				messages: messages.data.messages
			});
			var objDiv = document.getElementById("chat_messages_scroll");
			objDiv.scrollTop = objDiv.scrollHeight;
			document.getElementById('text_box').value = "";
		});
	};

	renderMessages = () => {
		if (!this.state.messages) {
			return <div>No messages!</div>;
		} else {
			let chats = this.state.messages.map((chat, index) => {
				let isOwner = false;
				if (chat.auth_id_of_comment === this.props.user.auth_id) isOwner = true;
				if (isOwner) {
					return (
						<div key={index} className="left_comment_container">
							<section className="left_message_container">
								<section className="left_message">
									<h1>{chat.message}</h1>
								</section>

								<section className="right_time_submitted">
									<h1>{moment(chat.time_submitted).fromNow()}</h1>
								</section>
							</section>
							<img className="profile_pic" src={this.state.client_info.profile_pic} alt="" />
						</div>
					);
				} else {
					return (
						<div key={index} className="right_comment_container">
							<img className="profile_pic" src={this.state.owner_info.profile_pic} alt="" />
							<section className="right_message_container">
								<section className="right_message">
									<h1>{chat.message}</h1>
								</section>
								<section className="left_time_submitted">
									<h1>{moment(chat.time_submitted).fromNow()}</h1>
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

export default connect(mapStateToProps)(Messages);
