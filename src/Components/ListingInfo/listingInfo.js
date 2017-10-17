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
            <div>
                 <h1>Listing Info page</h1> 
                <div className="ListingInfoContainer">
                    <Paper style={{ width:'400px', padding: '10px', margin:'20px' }}>
                        <ListingImages />
                    </Paper>
                    <Paper style={{ 
                        width: '400px', 
                        paddingTop: '0px', 
                        marginTop:'20px', 
                        textAlign:'center' 
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