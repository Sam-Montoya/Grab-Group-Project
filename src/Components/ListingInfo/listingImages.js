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
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState({
			activeStep: this.state.activeStep + 1
		});
	};

	handleBack = () => {
		this.setState({
			activeStep: this.state.activeStep - 1
		});
	};

	render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography> Picture {this.state.activeStep + 1} of 3</Typography>
                </Paper>
                {
                    (this.state.activeStep === 0) ? <div className="imgContainer">
                        <img src="https://s.yimg.com/ny/api/res/1.2/tQKmRJ1OYtRWStip4MacXg--/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NjAwO2g9NDAw/https://cdn2.benzinga.com/files/imagecache/600x400xUP/images/story/2012/console-playstation-xbox-joystick-video-games-1216816.jpeg" />
                    </div>
                        :
                        (this.state.activeStep === 1) ?
                            <div className="imgContainer">
                                <img src="https://pisces.bbystatic.com/BestBuy_US/store/ee/2016/vg/pol/evn-xbox-one-s-0821.jpg;maxHeight=288;maxWidth=520" />
                            </div>
                            :
                            <div className="imgContainer">
                                <img src="http://www.omarimc.com/wp-content/uploads/2017/06/video-games-893225_960_720.jpg" />
                            </div>
                }

                <MobileStepper
                    type="dots"
                    steps={3}
                    position="static"
                    activeStep={this.state.activeStep}
                    style={{ backgroundColor: 'white' }} 
                    nextButton={
                        <Button dense onClick={this.handleNext} disabled={this.state.activeStep === 2}>
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
