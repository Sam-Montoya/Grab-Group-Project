import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div style={{backgroundColor:'red'}}>
                <h1>Home</h1>
                <Link to='/allListings'>Yeo</Link>
            </div>
        )
    }
}

export default Home