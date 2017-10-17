import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import Router from '../router'
import Inbox from 'material-ui-icons/Inbox';
import Favs from 'material-ui-icons/Star';
import ViewList from 'material-ui-icons/ViewList';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Profile from 'material-ui-icons/Face';
import Description from 'material-ui-icons/Description';
import Create from 'material-ui-icons/Create';
import Search from 'material-ui-icons/Search';
import Button from 'material-ui/Button';


import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router-dom';
import './nav.css'
import Input from 'material-ui/Input';


const drawerWidth = 200;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden'
    },
    
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        color: 'white',
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        color: 'white',

        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        color: 'white',
        width: 250,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <List className={classes.root} >
                    <Link to='/'>
                        <ListItem button>
                            <Avatar>
                                <Inbox />
                            </Avatar>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                    </ Link>
                    <Link to='/profile'>
                        <ListItem button>
                            <Avatar>
                                <Profile />
                            </Avatar>
                            <ListItemText primary="Profile" />
                        </ListItem>
                    </Link>
                    {/* <Divider inset /> */}
                    <Link to='/myFavorites'>
                        <ListItem button>
                            <Avatar>
                                <Favs />
                            </Avatar>
                            <ListItemText primary="My Favorites" />
                        </ListItem>
                    </Link>
                    {/* <Divider inset /> */}
                    <Link to='/addListing'>
                        <ListItem button>
                            <Avatar>
                                <Create />
                            </Avatar>
                            <ListItemText primary="Add Listing" />
                        </ListItem>
                    </Link>
                    {/* <Divider inset /> */}
                    <Link to='/allListings'>
                        <ListItem button>
                            <Avatar>
                                <Search />
                            </Avatar>
                            <ListItemText primary="Search" />
                        </ListItem>
                    </Link>
                    {/* <Divider inset /> */}
                    <Link to='/settings'>
                        <ListItem button>
                            <Avatar>
                                <Create />
                            </Avatar>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </Link>
                    {/* <Divider inset /> */}
                    <a href={process.env.REACT_APP_LOGOUT}>
                        <ListItem button onClick={this.signout}>
                            <Avatar>
                                <ViewList />
                            </Avatar>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                    </a>
                    {/* <Divider inset /> */}
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar 
                    className={classes.appBar}
                    >

                        <Toolbar>
                            <div className="nav">

                                <div className="Menu">
                                    <IconButton
                                        color="contrast"
                                        aria-label="open drawer"
                                        onClick={this.handleDrawerToggle}
                                        className={classes.navIconHide}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </div>

                                <div>
                                    <Typography type="title" color="inherit" noWrap >
                                        Grab
                            </Typography>
                                </div>

                                <div className="input">
                                    <Input
                                        placeholder="Search"
                                        className="input"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                        style={{ backgroundColor: 'white', minWidth:'300px' }}
                                    />
                                </div>
                                
                                <div>
                                    <Button raised
                                        color="white"
                                        style={{ backgroundColor: 'white' }}>
                                        Sign In
                                     </Button>
                                </div>
                            </div>
                        </Toolbar>

                    </AppBar>
                    <Hidden mdUp>
                        <Drawer
                            type="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            onRequestClose={this.handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            type="permanent"
                            open
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <main className={classes.content}>
                        {Router}
                    </main>
                </div>
            </div>
        );
    }
}

ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);