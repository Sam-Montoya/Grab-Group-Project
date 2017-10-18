import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Components/Home/Home'
import AddListing from './Components/AddListing/addListing';
import AllListings from './Components/AllListings/allListings';
import ListingInfo from './Components/ListingInfo/listingInfo';
import MyFavorites from './Components/MyFavorites/MyFavorites';
import Settings from './Components/Settings/Settings';
import Profile from './Components/Profile/Profile';


export default (
    <Switch>
        <Route exact path="/" component={Home}> </Route>
        <Route path="/addlisting" component={AddListing}> </Route>
        <Route path="/allListings" component={AllListings}> </Route>
        <Route path="/listinginfo" component={ListingInfo}> </Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/myfavorites" component={MyFavorites}></Route>
        <Route path="/profile" component={Profile}></Route>
    </Switch>
)