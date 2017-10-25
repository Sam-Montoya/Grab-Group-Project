
import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog'

export default class DialogBox extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            message: '',
            title: ''
        };

        this.yes = this.yes.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.is_open,
            message: nextProps.message,
            title: nextProps.title
        });
    }

    handleOpen = (state) => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    yes() {
        if (this.props.message === 'Are you sure you want to remove this listing from your favorites?') {
            this.props.removeFavorite(this.props.listing_id);
        } else if (this.props.message === 'Are you sure you want to remove this listing?'){
            this.props.removeListing(this.props.listing_id);
        }
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>{this.state.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.yes} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}