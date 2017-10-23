import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import Button from 'material-ui/Button';
import './listingInfo.css';

const styles = (theme) => ({
	root: {
		maxWidth: 600,
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		// paddingLeft: theme.spacing.unit * 4,
		marginBottom: 0,
		backgroundColor: 'white'
	}
});

class TextMobileStepper extends React.Component {
	constructor() {
		super();
		this.test = this.test.bind(this);
	}
	state = {
		activeStep: 0,
		picture: '',
		newWidth1: 2,
		numer: 200
	};

	handleNext = () => {
		this.setState({
			activeStep: this.state.activeStep + 1
		});
		this.test();
	};

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1
		});
		this.test();
	};

	test() {
		switch (this.state.activeStep) {
			case 0:
				console.log('hit');
				this.setState({
					pictures: (
						<div className="imgContainer">
							<img src={this.props.images[0]} alt="" />
						</div>
					)
				});
				break;
			case 1:
				this.setState({
					pictures: (
						<div className="imgContainer">
							<img src={this.props.images[1]} alt="" />
						</div>
					)
				});
				break;
			case 2:
				this.setState({
					pictures: (
						<div className="imgContainer">
							<img src={this.props.images[2]} alt="" />
						</div>
					)
				});
				break;
			case 3:
				this.setState({
					pictures: (
						<div className="imgContainer">
							<img src={this.props.images[3]} alt="" />
						</div>
					)
				});
				break;
			default:
				this.setState({
					pictures: (
						<div className="imgContainer">
							<img src={this.props.images[0]} alt="" />
						</div>
					)
				});
				break;
		}
	}

	componentWillReceiveProps(nextProps) {
		this.props = nextProps;
		console.log(nextProps);
	}

	componentDidMount() {
		let height, width, newWidth1;

		let img = new Image();
		img.src = this.props.images[0];
		img.onload = () => {
			height = img.height;
			width = img.width;
			newWidth1 = height / width * 150;
			this.setState({
				newWidth1: newWidth1
			});
		};
	}

	render() {
		const classes = this.props.classes;
		
		return (
			<div className={classes.root}>
				<Paper square elevation={0} className={classes.header}>
					<Typography>
						Picture {this.state.activeStep + 1} of {this.props.images.length}
					</Typography>
				</Paper>

				{this.state.activeStep === 0 ? (
					<div className="imgContainer">
						<img
							src={this.props.images[0]}
							alt=""
						/>
					</div>
				) : this.state.activeStep === 1 ? (
					<div className="imgContainer">
						<img src={this.props.images[1]} alt="" />
					</div>
				) : this.state.activeStep === 3 ? (
					<div className="imgContainer">
						<img src={this.props.images[2]} alt="" />
					</div>
				) : this.state.activeStep === 4 ? (
					<div className="imgContainer">
						<img src={this.props.images[3]} alt="" />
					</div>
				) : (
					<div className="imgContainer">
						<img src={this.props.images[4]} alt="" />
					</div>
				)}

				<MobileStepper
					type="dots"
					steps={this.props.images.length}
					position="static"
					activeStep={this.state.activeStep}
					style={{ backgroundColor: 'white' }}
					nextButton={
						<Button
							dense
							onClick={this.handleNext}
							disabled={this.state.activeStep === this.props.images.length - 1}>
							Next
							<KeyboardArrowRight />
						</Button>
					}
					backButton={
						<Button dense onClick={this.handleBack} disabled={this.state.activeStep === 0}>
							<KeyboardArrowLeft />
							Back
						</Button>
					}
				/>
			</div>
		);
	}
}

TextMobileStepper.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextMobileStepper);

// {this.state.activeStep === 0 ? (
// 	<div className="imgContainer">
// 		<img src={image} />
// 	</div>
// ) : this.state.activeStep === 1 ? (
// 	<div className="imgContainer">
// 		<img src="" />
// 	</div>
// ) : (
// 	<div className="imgContainer">
// 		<img src="http://www.omarimc.com/wp-content/uploads/2017/06/video-games-893225_960_720.jpg" />
// 	</div>
// )}
