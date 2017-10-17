import React, { Component } from 'react';
import ListingImages from './listingImages'
import Paper from 'material-ui/Paper';


class ListingInfo extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        const img = require('../../images/xbox.jpg')
        return (
            <div className="ListingPage">
                <div className="sidebar">
                    <Paper className="leftBar">
                        <p>Price: $255</p>
                        <hr />
                    </Paper>
                </div>
                <div className="ListingInfoContainer">
                    <Paper style={{ width: '400px'}}>
                        <ListingImages />
                    </Paper>
                    <Paper style={{
                        width: '400px',
                        paddingTop: '0px',
                        marginTop: '20px',
                        textAlign: 'center'
                    }}>
                        <h1>Bens Xbox</h1>
                        <h3>Awesome condidtion</h3>
                        <p>Its really cool</p>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default ListingInfo