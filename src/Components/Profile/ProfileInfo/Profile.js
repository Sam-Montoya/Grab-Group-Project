import React, { Component } from 'react';
import './profile.css'
import Inbox from 'material-ui-icons/Message';
import Pageview from 'material-ui-icons/Pageview';
import Star from 'material-ui-icons/Star';
import Person from 'material-ui-icons/Person';
import Back from 'material-ui-icons/KeyboardBackspace';
import Avatar from 'material-ui/Avatar';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserInfo } from '../../../Redux/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            listings: [],
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            profile_pic: '',
            username: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/getUserListings/${this.props.user.auth_id}`).then((res) => {
            this.setState({
                listings: res.data
            })
        })
        this.props.getUserInfo();

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user)
        if (nextProps.user) {
            console.log(nextProps.user)
            this.setState({
                profile_pic: nextProps.user.profile_pic,
                username: nextProps.user.username
            })
        }

    }

    handleChangeInput = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {

        console.log((this.props.user) ? this.props.user : 'no user')
        console.log('State', this.state)

        const profileImg = require('../../../images/benMt.1866739e.jpg')

        let color1 = 'rgba(0, 137, 54, 0.5'
        let color2 = 'rgba(46, 29, 138, 0.5'
        let color3 = 'rgba(46, 138, 138, .5)'

        let listings = this.state.listings.map((elem, i) => {
            var x = Math.floor(Math.random() * 3 + 1);
            if (elem.images)
                return (
                    <div>
                        <Link
                            to={{
                                pathname: '/listingInfo/' + i,
                                query: elem
                            }}>
                            <Paper
                                elevation={4}
                                className="item_container"
                                style={{
                                    background: `url(${elem.images[0]}) no-repeat center center`,
                                    backgroundSize: 'cover'
                                }}>
                                <div
                                    className="item_description"
                                    style={{ backgroundColor: 'rgba(53, 138, 255, 0.68)' }}>
                                    <h1 className="title">{elem.title}</h1>
                                    <hr />
                                    <h2 className="descriptionText">{elem.city}, {elem.state}</h2>
                                    <h3 className="descriptionText">{elem.price}</h3>
                                </div>
                            </Paper>
                        </Link>
                    </div>
                );
        });


        return (
            <div>
                <div className="ProfilePageContainer">
                    {/* <div className="leftNavProfile">
                        <div className="LinkIconsonLeftProfile"> */}

                    {/* <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#455A64', height: '60px', width: '60px' }}>
                                    <Back />
                                </Avatar>
                            </div> */}

                    {/* <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#C62828', height: '60px', width: '60px' }}>
                                    <Person />
                                </Avatar>
                            </div>


                            <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: 'navy', height: '60px', width: '60px' }}>
                                    <Inbox />
                                </Avatar>
                            </div>


                            <div style={{ backgroundColor: 'white', width: '100%', height: '25%', }}>
                                <Avatar style={{ backgroundColor: '#E65100', height: '60px', width: '60px' }}>
                                    <Star />
                                </Avatar>
                            </div> */}
                    {/* 
                        </div>
                    </div> */}

                    <div className="rightNavFavorites">
                        <div className="categories">
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

                    <div className="MainContentProfile">

                        <div className="CoverPhoto">
                            <div className="CoverPhotoStuff">
                                <div>
                                    <Avatar
                                        alt="Me"
                                        src={(this.state.profile_pic) ? this.state.profile_pic : profileImg}
                                        style={{ width: '120px', height: '120px', marginRight: '40px' }}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: '30px' }}>{(this.state.username) ? this.state.username : 'Ben Ahlander'}</p>
                                    <div class="locationProfile">
                                        <i class="material-icons">
                                            location_on
                                            </i>
                                            {
                                                this.props.user
                                                ?
                                                <p>{this.props.user.city}, {this.props.user.state}</p>
                                                :
                                                null
                                            }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="ProfileHeading">My Listings</h1>
                        <div className="FavoriteListingsContainer">
                            {listings}
                        </div>

                        <div className="Chat">
                            <div className="ChatNotification"></div>
                            <Avatar style={{ backgroundColor: '#03A9F4', height: '60px', width: '60px' }}>
                                <Inbox />
                            </Avatar>
                        </div>

                    </div>
                    {/* <div className="rightNavFavorites">
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
                        </div> */}

                    {/* </div> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(Profile);