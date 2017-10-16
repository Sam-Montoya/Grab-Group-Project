require('dotenv').config();

const express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	Auth0Strategy = require('passport-auth0'),
	massive = require('massive'),
	session = require('express-session'),
	axios = require('axios');

let getController = require('./GetController/getController.js')

let app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTIONSTRING)
	.then((db) => {
		app.set('db', db);
		console.log('Connected successfully.');
	})
	.catch(err => console.log('Something happened... ' + err));

/**
 * Endpoints
 */

// -- Get Requests
app.get('/api/getInitialUserInfo', (request, response) => {
	let db = app.get('db');
	getController.getInitialUserInfo(db, response);
});
app.get('/api/getUserInfo', (request, response) => {
	getController.getUserInfo();
});
app.get('/api/getUserListings', (request, response) => {});
app.get('/api/getUserChats', (request, response) => {});

// -- Post Requests

// -- Put Requests

// -- Delete Requests

/**
 * Endpoints End
 */

/**
 * Auth 0
 */

app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new Auth0Strategy(
		{
			domain: process.env.AUTH_DOMAIN,
			clientID: process.env.AUTH_CLIENT_ID,
			clientSecret: process.env.AUTH_CLIENT_SECRET,
			callbackURL: process.env.AUTH_CALLBACK
		},
		function(accessToken, refreshToken, extraParams, profile, done) {
			// app.get('db').find_user(profile.id).then((user) => {
			// 	if (user[0]) {
			// 		done(null, user);
			// 	} else {
			// 		console.log(profile); //debug
			// 		let fullname = profile.name.givenName + " " + profile.name.familyName;
			// 		app.get('db').create_user([profile.id, fullname, profile.username, profile.picture, profile.emails[0].value]).then(user => {
			// 		    done(null, user[0]);
			// 		});
			// 		done(null, profile);
			// 	}
			// });
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.get('/auth', passport.authenticate('auth0'));

app.get(
	'/auth/callback',
	passport.authenticate('auth0', {
		successRedirect: 'http://localhost:3000/#/',
		failureRedirect: '/'
	})
);

app.get('/auth/me', (req, res, next) => {
	if (!req.user) {
		res.status(200).send('User not found');
	} else {
		res.status(200).send(req.user);
	}
});

app.get('/auth/logout', (req, res) => {
	req.logOut();
	res.redirect(302, 'http://localhost:3000/#/');
});
/**
 * Auth 0 End
 */

const port = 3060;
app.listen(port, console.log(`It's lit on ${port} fam!`));
