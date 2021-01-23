'use strict';

const passport = require('passport');

const express = require('express');
const session = require('express-session');

const FileStore = require('session-file-store')(session)


function userToRef(user, done) {
	done(null, user.username);
}

function refToUser(userRef, done) {
	const user = users[userRef]; 
	if (user) {
		done(null, user);
	} else {
		done('User unknown');
	}
}

const users = { }

module.exports = (app) => {
	
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: 'isel-leirt',
		store: new FileStore()
	}))

	app.use(passport.initialize())
	app.use(passport.session())
	
	passport.serializeUser(userToRef)
	passport.deserializeUser(refToUser)
	
	return {
		login: (req, username, password) => new Promise((resolve, reject) => {
			if (username && password) {
				const user = users[username];
				if (user && password === user.password) {
					req.login(user, (err, result) => {
						if (err) {
							reject(err)
						} else {
							resolve(result)
						}
					})
				} else {
					reject('Bad username or password.');
				}
			} else {
				reject('Missing username or password.')
			}
		}),
		logout: (req) => new Promise((resolve, reject) => {
			req.logout()
			req.session.save(() => {
				resolve()
			})
		}),
		register: (username, password) => new Promise((resolve, reject) => {
			if (username && password) {
				users[username] = { username: username, password: password}
				resolve(users)
			}else {
				reject('Missing username or password.')
			}
		})
	}
}