'use strict'

const express = require('express')

const error = require('./covida-errors.js')

function webapi(app, service) {
	
	const theWebApi = {
		
		PopularGames: ( req, res ) =>  {
			service.getPopularGames().then( popularGames => { 
			
				const answer = { 'PopularGames': popularGames  }
				res.json(answer);
						
				}).catch( err => {
						
					switch (err) {
						case error.EXTERNAL_SERVICE_FAILURE:
							res.status(502).json({ cause: 'External service failure.' })
							break;
						default:
							res.status(500).json({ cause: 'Failed to get games.'})
							break;
					}
						
				})
			
		},
			
		searchGames: ( req, res ) => {
		
			service.searchGames(req.body.game).then(games => {
				const answer = { 'Games': games }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.EXTERNAL_SERVICE_FAILURE:
						res.status(502).json({ cause: 'External service failure.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to get games.'})
						break;
				}
			})				
		},
		
		createGroup: ( req, res ) => {
				
			service.createGroup(req.body.name, req.body.description).then(group => {
				
				const answer = { 'Group': group }
				res.json(answer)
				}).catch(err =>  {
					switch (err) {
						case error.MISSING_ARGUMENT:
							res.status(400).json({ cause: 'Missing argument.' })
							break;
						default:
							res.status(500).json({ cause: 'Failed to create group.'})
							break;
					}
					
				})
		},
		
		listGroups: ( req, res ) => {
				
			service.listGroups().then(groups => {
				const answer = { 'Groups': groups }
				res.json(answer)
			}).catch(err => res.status(500).json({ cause: 'Failed to get groups.'}))
		},
		
		editGroup: ( req, res ) => {
				
			service.editGroup(req.body.id, req.body.parameter, req.body.edit).then(group => {
				const answer = { 'Group': group }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.WRONG_ID:
						res.status(400).json({ cause: 'ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					case error.WRONG_ARGUMENT:
						res.status(400).json({ cause: 'Parameter must be Name / Description.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to edit group.'})
						break;
				}
			})
		},
		
		showGroup: ( req, res ) => {
				
			service.showGroup(req.body.id).then( group => {
				const answer = { 'Group': group }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.WRONG_ID:
						res.status(400).json({ cause: 'ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to show group.'})
						break;
				}
			})
		},
		
		addGame: ( req, res ) => {
			
			service.addGame(req.body.groupID, req.body.gameID).then(group => {
				const answer = { 'Group': group }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.EXTERNAL_SERVICE_FAILURE:
						res.status(502).json({ cause: 'External service failure.' })
						break;
					case error.WRONG_ID:
						res.status(400).json({ cause: 'Group ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					case error.WRONG_ARGUMENT:
						res.status(400).json({ cause: 'Game already exists in this group.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to add game.'})
						break;
				}
			})
		},
		
		removeGame: ( req, res ) => {
			
			service.removeGame(req.body.groupID, req.body.gameID).then(group => {
				const answer = { 'Group': group }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.WRONG_ID:
						res.status(400).json({ cause: 'Group ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					case error.WRONG_ARGUMENT:
						res.status(400).json({ cause: 'Game non-existent in this group.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to remove game.'})
						break;
				}
			})
		},
		
		gamesByRating: ( req, res ) => {
		
			service.gamesByRating(req.body.id, req.body.min, req.body.max).then(games => {
				const answer = { 'Games': games }
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.WRONG_ID:
						res.status(400).json({ cause: 'ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					case error.WRONG_ARGUMENT:
						res.status(400).json({ cause: 'Boundaries must be between 0 and 100 and Max must be greater than Min.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to get games.'})
						break;
				}
			})
		},
		
		removeGroup: ( req, res ) => {
			service.removeGroup(req.body.id).then( () => {
				const answer = 'Group eliminated'
				res.json(answer)
			}).catch(err => {
				switch (err) {
					case error.WRONG_ID:
						res.status(400).json({ cause: 'ID non-existent.' })
						break;
					case error.MISSING_ARGUMENT:
						res.status(400).json({ cause: 'Missing argument.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to remove group.'})
						break;
				}
			})
		}
		
	}
	
	app.use(express.json())
	
	app.get('/popularGames', theWebApi.PopularGames)
	app.post('/searchGames', theWebApi.searchGames)
	app.post('/createGroup', theWebApi.createGroup)
	app.get('/listGroups', theWebApi.listGroups)
	app.post('/editGroup', theWebApi.editGroup)
	app.post('/showGroup', theWebApi.showGroup)
	app.post('/addGame', theWebApi.addGame)
	app.post('/removeGame', theWebApi.removeGame)
	app.post('/gamesByRating', theWebApi.gamesByRating)
	app.post('/removeGroup', theWebApi.removeGroup)

	
	return theWebApi
	
}

module.exports = webapi