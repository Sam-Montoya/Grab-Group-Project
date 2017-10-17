import React, { Component } from 'react';
import ListingImages from './listingImages'
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Inbox from 'material-ui-icons/Inbox';
import Pageview from 'material-ui-icons/Pageview';


class ListingInfo extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        const img = require('../../images/benMt.1866739e.jpg')
        return (
            <div className="ListingPage">
                <div className="sidebar">
                    <div className="leftBar">
                        <Avatar alt="Remy Sharp" src={img} style={{ width: '60px', height: '60px', margin: 'auto', marginTop: '20px' }} />
                        <p>Price: $255</p>
                        <Button raised>
                            Inbox
                        </Button>
                        <Button raised>
                            My Listings
                        </Button>
                        <Button raised>
                            My Favorites
                        </Button>

                        <List>
                            <ListItem button>
                                <Avatar style={{backgroundColor:'lightblue', width:'30px', height:'30px'}}>
                                    <Inbox />
                                </Avatar>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <Avatar style={{backgroundColor:'purple', width:'30px', height:'30px'}}>
                                    <Pageview />
                                </Avatar>
                                <ListItemText primary="Listings"/>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div className="ListingInfoContainer">
                    <Paper style={{ width: '400px' }}>
                        <ListingImages />
                    </Paper>
                    <Paper style={{
                        width: '400px',
                        paddingTop: '0px',
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