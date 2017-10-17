import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './allListings.css'
import axios from 'axios'

import img from '../../images/xbox.jpg'

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
                <a href="http://localhost:3001/listinginfo">
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