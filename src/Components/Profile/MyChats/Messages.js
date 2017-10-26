import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './ChatAvatars.css';

class Messages extends React.Component {
	constructor() {
		super();

		this.state = {
			client_id: '',
			owner_id: '',
			listing_id: null,
			messages: [],
			owner_profile_pic: '',
			client_profile_pic: ''
		};
	}
	componentDidMount() {
		this.setState(
			{
				client_id: this.props.chatData.client_id,
				owner_id: this.props.chatData.owner_id,
				listing_id: this.props.chatData.listing_id,
				messages: this.props.chatData.messages,
				messageText: ''
			},
			() => {
				this.getClientInfo();
			}
		);
	}
	componentWillReceiveProps(nextProps) {
		this.setState(
			{
				client_id: nextProps.chatData.client_id,
				owner_id: nextProps.chatData.owner_id,
				listing_id: nextProps.chatData.listing_id,
				messages: nextProps.chatData.messages
			},
			() => {
				this.getClientInfo();
			}
		);
	}

	render() {
		console.log('MESSAGES STATE: ', this.state);
		return (
			<section className="chats_messages_container">
				<div className="chats_all_messages" id="chat_messages_scroll">
					{this.renderMessages()}
				</div>
				<div className="chats_inputbox_container">
					<textarea
						onChange={(text) => this.setState({ messageText: text.target.value })}
						placeholder="Type a message here.."
					/>
					<button onClick={() => this.submitMessage()}>Submit</button>
				</div>
			</section>
		);
	}

	getClientInfo = () => {
		if (this.props.user.auth_id === this.state.owner_id) {
			axios.get('/api/getUserInfo/' + this.state.client_id).then((userData) => {
				this.setState({
					owner_profile_pic: userData.data.profile_pic,
					client_profile_pic: this.props.user.profile_pic
				});
			});
		} else {
			axios.get('/api/getUserInfo/' + this.state.owner_id).then((userData) => {
				this.setState({
					owner_profile_pic: userData.data.profile_pic,
					client_profile_pic: this.props.user.profile_pic
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
							<img className="profile_pic" src={this.state.client_profile_pic} alt="" />
						</div>
					);
				} else {
					return (
						<div key={index} className="right_comment_container">
							<img className="profile_pic" src={this.state.owner_profile_pic} alt="" />
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
