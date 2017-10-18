import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from './Drawer'
import './nav.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../Redux/reducer';
import { Link } from 'react-router-dom';


class ButtonAppBar extends Component {

  componentDidMount() {
    this.props.getUserInfo();
  }
  
  render() {
    return (
      <div className="nav">
        <AppBar position="static">
          <Toolbar>
            <Drawer />
            <Typography type="title" color="inherit">
              <Link style={{color: 'white'}}to='/allListings'>Grab</Link>
          </Typography>

            {/* This turnary checks to see if someone is logged in and displays the correct login/logout button accordingly. */}
            {
              this.props.user
                ?
                <a href={process.env.REACT_APP_LOGOUT}><Button color="contrast">Logout</Button></a>
                :
                <a href={process.env.REACT_APP_LOGIN}><Button color="contrast">Login</Button></a>
            }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUserInfo })(ButtonAppBar);