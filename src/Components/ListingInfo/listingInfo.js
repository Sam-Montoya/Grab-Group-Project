import React, { Component } from 'react';
import ListingImages from './listingImages'
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Inbox from 'material-ui-icons/Message';
import Pageview from 'material-ui-icons/Pageview';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';



class ListingInfo extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        const img = require('../../images/benMt.1866739e.jpg')
        const twitter = require('../../images/TwitterLogo2.png')
        const gmail = require('../../images/mailLogo.png')
        const faceboook = require('../../images/fbLogo.png')
        const xbox = require('../../images/xbox.jpg')
        return (
            <div className="ListingPage">
                <div className="sidebar">
                    <div className="leftBar">
                        <div className="topMenuThing">
                            <a href="#">
                                <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                    <Avatar style={{ backgroundColor: '#607D8B' }}>
                                        <Back />
                                    </Avatar>
                                </div>
                            </a>
                            <a href="#">
                                <div style={{ backgroundColor: '#EF9A9A', width: '100%', height: '25%', }}>
                                    <Avatar style={{ backgroundColor: '#C62828' }}>
                                        <Person />
                                    </Avatar>
                                </div>
                            </a>
                            <a href="#">
                                <div style={{ backgroundColor: 'lightblue', width: '100%', height: '25%', }}>
                                    <Avatar style={{ backgroundColor: 'navy' }}>
                                        <Inbox />
                                    </Avatar>
                                </div>
                            </a>
                            <a href="#">
                                <div style={{ backgroundColor: '#FF9800', width: '100%', height: '25%', }}>
                                    <Avatar style={{ backgroundColor: '#E65100' }}>
                                        <Star />
                                    </Avatar>
                                </div>
                            </a>
                        </div>
                        <h3>Price: $255</h3>
                        <hr />
                        <h3>Favorited: 23</h3>
                        <hr />
                        <h3>(812)234-2343</h3>
                        <div className="logos">
                            <img src={faceboook} />
                            <img src={twitter} />
                            <img src={gmail} />
                        </div>
                        <hr />
                        <div>
                            <div className="moreFromThisSellerContainer">
                                <h3>More from this seller</h3>
                                <div className="moreFromThisSeller">
                                    <img src={xbox} />
                                    <caption>Xbox 360</caption>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ListingInfoContainer">
                    <Paper
                        className="half1"
                    >
                        <ListingImages />
                    </Paper>
                    <Paper
                        className="half"
                    >
                        <h3>Bens Xbox</h3>
                        <h3>Awesome condidtion</h3>
                        <p>Its really cool</p>
                    </Paper>
                    <Paper className="full">
                        <h3>Description</h3>
                        <p>bla bla bal</p>
                        <p>bla bla</p>
                        <p>hello world</p>
                    </Paper>
                    <Paper
                        className="half1"
                    >
                        <h3>Pros</h3>
                        <h3>Awesome condidtion</h3>
                        <p>Its really cool</p>
                    </Paper>
                    <Paper className="half"
                    >
                        <h3>Cons</h3>
                        <h3>Jk its broken</h3>
                        <p>Nothing works</p>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default ListingInfo