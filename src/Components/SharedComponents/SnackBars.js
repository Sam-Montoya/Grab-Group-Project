import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackBars extends React.Component {
	state = {
		open: false,
		vertical: 'top',
		horizontal: 'left',
		message: ''
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			open: nextProps.is_open,
			message: nextProps.message
		});
	}

	handleClick = (state) => () => {
		this.setState({ open: true, ...state });
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

	render() {
		if (this.state.open) {
			setTimeout(() => {
				this.setState({
					open: false
				});
			}, 1500);
		}
		const { vertical, horizontal, open } = this.state;
		return (
			<div>
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onRequestClose={this.handleRequestClose}
					SnackbarContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.state.message}</span>}
				/>
			</div>
		);
	}
}
