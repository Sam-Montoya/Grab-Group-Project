import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './allListings.css'
import axios from 'axios'
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Inbox from 'material-ui-icons/Inbox';
import Pageview from 'material-ui-icons/Pageview';
import Input from 'material-ui/Input';
import img from '../../images/xbox.jpg'
import profile from '../../images/benMt.1866739e.jpg'

class allListings extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        console.log('MOUNTED')
        axios.get('http://localhost:3060/api/getUserListings').then((res) => {
            console.log(res.data)
        })
    }

    render() {
        return (
            <div>
                <div className="sidebar">
                    <div className="leftBar">
                        <Avatar alt="Remy Sharp" src={profile} style={{ width: '60px', height: '60px', margin: 'auto', marginTop: '20px' }} />
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
                                <Avatar style={{ backgroundColor: 'lightblue', width: '30px', height: '30px' }}>
                                    <Inbox />
                                </Avatar>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <Avatar style={{ backgroundColor: 'purple', width: '30px', height: '30px' }}>
                                    <Pageview />
                                </Avatar>
                                <ListItemText primary="Listings" />
                            </ListItem>
                        </List>
                        <div style={{
                            width: '100%',
                            backgroundColor: 'white',
                            padding:'2px'
                        }}>
                            <p>Location</p>
                            <Input
                                placeholder="State"
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                            <Input
                                placeholder="City"
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                            />
                        </div>
                    </div>
                </div>
                <a href="http://localhost:3001/#/listinginfo">
                    <Paper elevation={4}
                        className="Item" style={{
                            width: '300px',
                            height: '200px',
                            margin: 'auto',
                            marginTop: '50px',
                            background: `url(${img}) no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                    >
                        <div className="description">
                            <p className="title">Xbox</p>
                            <p className="descriptionText"> This is a really cool xbox. You should buy it!</p>
                        </div>
                    </Paper>
                </a>
            </div>
        );
    }
}

export default allListings