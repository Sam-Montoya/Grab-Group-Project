import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddListing from './Components/AddListing/addListing';
import AllListings from './Components/AllListings/allListings';
import ListingInfo from './Components/ListingInfo/listingInfo';
import MyFavorites from './Components/Profile/MyFavorites/MyFavorites';
import Profile from './Components/Profile/ProfileInfo/Profile';
import ProsterProfile from './Components/Profile/PosterProfile/PosterProfile';
import ChatAvatars from './Components/Profile/MyChats/ChatAvatars';

export default (
    <Switch>
        <Route exact path="/" component={AllListings} />
        <Route path="/addlisting" component={AddListing} />
        <Route path="/listinginfo" component={ListingInfo} />
        <Route path="/myfavorites" component={MyFavorites} />
        <Route path="/profile" component={Profile} />
        <Route path="/ownerProfile" component={ProsterProfile} />
        <Route path="/myChats" component={ChatAvatars} />
    </Switch>
)