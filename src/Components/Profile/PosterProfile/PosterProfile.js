import React, { Component } from 'react';
import './PosterProfile.css';
import Inbox from 'material-ui-icons/Message';
import Avatar from 'material-ui/Avatar';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import { getUserInfo } from '../../../Redux/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoriesBar from '../../SharedComponents/CategoriesBar';
import Moment from 'react-moment';
import 'moment-timezone';

class PosterProfile extends Component {
    constructor() {
        super();
        this.state = {
            listingUserInfo: {
                auth_id: '',
                category: '',
                city: '',
                cons: '',
                contact_status: '',
                description: '',
                images: [],
                listing_id: null,
                phone_number: '',
                price: '',
                pros: '',
                state: '',
                time_submitted: '',
                title: '',
                user_id: 0,
                zip: 0
            },
            listings: [],
            checkedA: false,
            checkedB: false,
            checkedC: false,
            checkedD: false,
            checkedE: false,
            profile_pic: '',
            username: ''
        };

        this.searchCategories = this.searchCategories.bind(this);
        this.coverPhotoInfo = this.coverPhotoInfo.bind(this);
    }

    componentDidMount() {
        this.getUserInfo();
        axios.get(`/api/getUserListings/${this.props.location.auth_id}`).then((userListings) => {
            if (Array.isArray(userListings.data)) {
                this.setState({
                    listings: userListings.data
                });
            }
        });
    }

    getUserInfo(auth_id) {
        axios.get('/api/getUserInfo/' + this.props.location.auth_id).then((userData) => {
            console.log('USER DATA ', userData)
            this.setState({
                listingUserInfo: userData.data
            });
        });
    }

    handleChangeInput = (name) => (event) => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        let listings;
        if (this.state.listings.length) {
            listings = this.state.listings.map((elem, i) => {
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
                                        <h2 className="descriptionText">
                                            {elem.city}, {elem.state}
                                        </h2>
                                        <h3 className="descriptionText">{elem.price}</h3>
                                    </div>
                                </Paper>
                            </Link>
                        </div>
                    );
            });
        }

        return (
            <div>
                <div className="ProfilePageContainer">
                    <div className="rightNavFavorites">
                        {/* Search Categories Function */}
                        {CategoriesBar('electronics', 'home', 'sports', 'parts', 'free')}
                    </div>
                    <div className="MainContentProfile">
                        <div className="CoverPhoto">
                            {/* Cover Photo JSX */}
                            <this.coverPhotoInfo />
                        </div>

                        {this.state.listings.length ? (
                            <div>
                                <h1 className="ProfileHeading">{this.state.listingUserInfo.username + "'s "}Listings ({this.state.listings.length})</h1>
                                <div className="FavoriteListingsContainer">{listings}</div>
                            </div>
                        ) : (
                                <div className="add_listing_container">
                                    <h1 className="ProfileHeading">You have no listings... :(</h1>
                                    <Link to="/addListing">
                                        <section className="add_listing_button">+</section>
                                    </Link>
                                </div>
                            )}

                        <div className="Chat">
                            <div className="ChatNotification" />
                            <Avatar style={{ backgroundColor: '#03A9F4', height: '60px', width: '60px' }}>
                                <Inbox />
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    searchCategories = function () {
        return (
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
        );
    };

    coverPhotoInfo() {
        const dateToFormat = new Date(this.state.listingUserInfo.date_created);
        if (this.props.user) {
            return (
                <div className="CoverPhotoStuff">
                    <div>
                        <Avatar
                            alt="Me"
                            src={this.state.profile_pic}
                            style={{ width: '120px', height: '120px', marginRight: '40px' }}
                        />
                    </div>
                    <div>
                        <p style={{ fontSize: '30px' }}>{this.state.username}</p>
                        <div class="locationProfile">
                            <i class="material-icons">location_on</i>
                            {this.props.user.city && this.props.user.state ? (
                                <p>
                                    {this.props.user.city}, {this.props.user.state}
                                </p>
                            ) : (
                                    <p>You havent filled out your information yet!</p>
                                )}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="CoverPhotoStuff">
                    <Avatar
                        alt="Me"
                        src={this.state.listingUserInfo.profile_pic}
                        style={{ width: '120px', height: '120px', marginRight: '40px' }}
                    />
                    <div className="memberInfo">
                        <h1>{this.state.listingUserInfo.username}</h1>
                        <br />
                        <h1>Member Since: <Moment format='MMM Do YYYY' date={dateToFormat} /></h1>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getUserInfo })(PosterProfile);