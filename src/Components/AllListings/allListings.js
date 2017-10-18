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
import Star from 'material-ui-icons/Star';
import Pageview from 'material-ui-icons/Pageview';
import Input from 'material-ui/Input';
import img from '../../images/xbox.jpg'
import profile from '../../images/benMt.1866739e.jpg'
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import green from 'material-ui/colors/green';

// const styles = {
//     checked: {
//         color: green[500],
//     },
// };

class allListings extends Component {
    constructor() {
        super()
        this.state = {
            listings: [],
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false
        }
    }

    componentDidMount() {
        console.log('MOUNTED')
        axios.get('http://localhost:3060/api/getUserListings').then((res) => {
            this.setState({
                listings: res.data
            })
        })
    }

    handleChangeInput = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {

        const { classes } = this.props;
        let color1 = 'rgba(0, 137, 54, 0.5'
        let color2 = 'rgba(46, 29, 138, 0.5'
        let color3 = 'rgba(46, 138, 138, .5)'

        let listings = this.state.listings.map((elem, i) => {
            console.log(elem)
            var x = Math.floor((Math.random() * 3) + 1);
            if (elem.image)
                return (
                    <div>
                        <a href="http://localhost:3000/#/listinginfo">
                            <Paper elevation={4}
                                className="Item" style={{
                                    width: '200px',
                                    height: '200px',
                                    margin: 'auto',
                                    margin: '20px',
                                    background: `url(${elem.image}) no-repeat center center`,
                                    backgroundSize: 'cover'
                                }}
                            >
                                <div className="description" style={{ backgroundColor: (x === 1) ? color1 : (x === 2) ? color2 : color3 }}>
                                    <p className="title">{elem.title}</p>
                                    <p className="descriptionText"> {elem.desc}</p>
                                </div>
                            </Paper>
                        </a>
                    </div>
                )
        })

        return (
            <div className="sidebar">
                <div className="leftBarOnSearch">
                    <Avatar alt="Remy Sharp" src={profile} style={{ width: '60px', height: '60px', margin: 'auto', marginTop: '20px' }} />

                    <List>
                        <ListItem button>
                            <Avatar style={{ backgroundColor: 'lightblue', width: '30px', height: '30px' }}>
                                <div style={{ backgroundColor: 'navy', width: '30px', height: '30px', paddingTop: '8px' }}>1</div>
                            </Avatar>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button >
                            <Avatar style={{ backgroundColor: 'purple', width: '30px', height: '30px', }}>
                                <Pageview />
                            </Avatar>
                            <ListItemText primary="Listings" />
                        </ListItem>
                        <ListItem button >
                            <Avatar style={{ backgroundColor: 'red', width: '30px', height: '30px' }}>
                                <Star />
                            </Avatar>
                            <ListItemText primary="Favorites" />
                        </ListItem>
                    </List>
                    <div style={{
                        width: '100%',
                        backgroundColor: 'rgba(255,255,255, 0.9)',
                        padding: '10px 0 30px 0'
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
                    <div
                        className="categories"
                    >
                        <p>Categories</p>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedA}
                                        onChange={this.handleChangeInput('checkedA')}
                                        value="checkedA"
                                        style={{ color: 'red' }}
                                    />
                                }
                                label="Electronics"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.checkedB}
                                        onChange={this.handleChangeInput('checkedB')}
                                        value="checkedB"
                                        style={{ color: 'Purple' }}

                                    />
                                }
                                label="Home"
                            />
                        </div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedC}
                                    onChange={this.handleChangeInput('checkedC')}
                                    value="checkedC"
                                    style={{ color: 'green' }}

                                />
                            }
                            label="Sports"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedD}
                                    onChange={this.handleChangeInput('checkedD')}
                                    value="checkedD"
                                    style={{ color: 'grey' }}

                                />
                            }
                            label="Parts"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checkedE}
                                    onChange={this.handleChangeInput('checkedE')}
                                    value="checkedE"
                                    style={{ color: 'green' }}

                                />
                            }
                            label="Free"
                        />
                    </div>

                </div>
                <div className="SearchContainer">
                    {/* <a href="http://localhost:3001/#/listinginfo">
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
                    </a> */}
                    {listings}
                </div>
            </div>
        );
    }
}

export default allListings