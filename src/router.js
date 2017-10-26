import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddListing from './Components/AddListing/addListing';
import AllListings from './Components/AllListings/allListings';
import ListingInfo from './Components/ListingInfo/listingInfo';
import MyFavorites from './Components/Profile/MyFavorites/MyFavorites';
import Profile from './Components/Profile/ProfileInfo/Profile';
import ProsterProfile from './Components/Profile/PosterProfile/PosterProfile';
import myChats from './Components/Profile/MyChats/MyChats';

export default (
    <Switch>
        <Route exact path="/" component={AllListings}> </Route>
        <Route path="/addlisting" component={AddListing}> </Route>
        <Route path="/listinginfo" component={ListingInfo}> </Route>
        <Route path="/myfavorites" component={MyFavorites}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/ownerProfile" component={ProsterProfile}></Route>
        <Route path="/myChats" component={myChats}></Route>
    </Switch>
)