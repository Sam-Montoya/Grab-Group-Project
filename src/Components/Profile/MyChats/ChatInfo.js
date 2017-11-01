import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';

export default function (props) {
    return (
        <div className='chats_profile_container'>
            <Avatar className='listings_profile_avatar'>
                <img style={{ height: '100%' }} src={props.userData.profile_pic} alt='' />
            </Avatar>
            <h1 style={{ fontSize: '1.5rem', marginTop: '15px' }}>{props.userData.username}</h1>
            <Link
                to={{
                    pathname:
                    '/ownerProfile/' + props.userData.user_id,
                    user_id: props.userData.user_id
                }} style={{width: '100%'}}>
                <button className="View_Profile_Button">View Profile</button>
            </Link>

            <Avatar className='listings_profile_avatar'>
                <img style={{ height: '100%' }} src={props.listingData.images[0]} alt='' />
            </Avatar>
            <h1 style={{ fontSize: '1.5rem', marginTop: '15px' }}>{props.listingData.title}</h1>
            <Link
                to={{
                    pathname:
                    '/listingInfo/' + props.listingData.listing_id
                }} style={{width: '100%'}}>
                <button className="View_Profile_Button">View This Listing</button>
            </Link>
        </div>
    )
}