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
		})
	}

	handleClick = (state) => () => {
		this.setState({ open: true, ...state });
	};

	handleRequestClose = () => {
		this.setState({ open: false });
	};

	render() {
        console.log(this.props)
		const { vertical, horizontal, open } = this.state;
		return (
			<div>
				{/* <Button onClick={this.handleClick({ vertical: 'top', horizontal: 'center' })}>
          Top-Center
        </Button> */}
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
