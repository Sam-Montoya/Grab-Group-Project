import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import router from './router';
import Nav from './Nav/Nav'
import Drawer from './Nav/Drawer'
import { getUserInfo } from './Redux/reducer';
import { connect } from 'react-redux';

//Theme
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import green from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    this.props.getUserInfo();
  }

  render() {

    const theme = createMuiTheme({
      palette: {
        primary: orange, // Purple and green play nicely together.
        secondary: {
          ...green,
          A400: '#00e677',
        },
        error: red,
      },
    });

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Nav reduxUser={ this.props.user }/>
        </MuiThemeProvider>
        <div style={{marginTop:'70px'}}>
          {router}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getUserInfo })(App);
