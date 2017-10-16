import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './allListings.css'

import img from '../../images/xbox.jpg'

function PaperSheet(props) {
    return (
        <div>
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
        </div>
    );
}

export default PaperSheet