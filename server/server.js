require('dotenv').config();

const express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	Auth0Strategy = require('passport-auth0'),
	massive = require('massive'),
	session = require('express-session'),
	cors = require('cors'),
	axios = require('axios');

let getController = require('./GetController/getController.js');
let postController = require('./PostController/postController.js');
let putController = require('./PutController/putController.js');
let deleteController = require('./DeleteController/deleteController.js');

let app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTIONSTRING)
	.then((db) => {
		app.set('db', db);
		console.log('Connected successfully.');
	})
	.catch((err) => console.log('Something happened... ' + err));

/**
 * Endpoints
 */

// -- Get Requests
app.get('/api/getInitialUserInfo/:auth_id', (request, response) => {
	let db = app.get('db');
	getController.getInitialUserInfo(db, request, response);
});
app.get('/api/getUserInfo/:auth_id', (request, response) => {
	let db = app.get('db');
	getController.getUserInfo(db, request, response);
});
app.get('/api/getUserFavorites/:user_id', (request, response) => {
	let db = app.get('db');
	getController.getUserFavorites(db, request, response);
});
app.get('/api/getUserListings/:auth_id', (request, response) => {
	let db = app.get('db');
	getController.getUserListings(db, request, response);
});
app.get('/api/getUserChats/:auth_id', (request, response) => {
	let db = app.get('db');
	getController.getUserChats(db, request, response);
});
app.get('/api/getAllListings', (request, response) => {
	let db = app.get('db');
	getController.getAllListings(db, response);
});

// -- Post Requests
app.post('/api/addListing', (request, response) => {
	let db = app.get('db');
	postController.addListing(db, request, response);
});
app.post('/api/addFavorite/:user_id/:listing_id', (request, response) => {
	let db = app.get('db');
	postController.addFavorite(db, request, response);
});
app.post('/api/startChat', (request, response) => {
	let db = app.get('db');
	postController.startChat(db, request, response);
});
app.post('/api/addMessage/:listing_id', (request, response) => {
	let db = app.get('db');
	postController.addMessage(db, request, response);
});

// -- Put Requests
app.put('/api/updateNotificationCount/:auth_id', (request, response) => {
	let db = app.get('db');
	putController.updateNotificationCount(db, request, response);
});
app.put('/api/updateUserInfo', (request, response) => {
	let db = app.get('db');
	putController.updateUserInfo(db, request, response);
});
app.put('/api/checkUserName/:username', (request, response) => {
	let db = app.get('db');
	putController.checkUserName(db, request, response);
});
app.put('/api/updateImages', (request, response) => {
	let db = app.get('db');
	putController.updateImages(db, request, response);
});

// -- Delete Requests
app.delete('/api/deleteChat', (request, response) => {
	let db = app.get('db');
	deleteController.deleteChat(db, request, response);
});

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
			app.get('db').find_user(profile.id).then((user) => {
				if (user[0]) {
					return done(null, user);
				} else {
					console.log(profile);
					app
						.get('db')
						.create_user([
							profile.id,
							profile.displayName,
							profile._json.name,
							profile.picture,
							profile.emails[0].value,
							new Date(Date.now())
						])
						.then((newUser) => {
							return done(null, newUser[0]);
						});
				}
			});
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
