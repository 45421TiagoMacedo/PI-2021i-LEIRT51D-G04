'use strict'

const error = require('./covida-errors.js')

function webapi(app, service) {
	
	const theWebApi = {
		
		PopularGames: ( req, res ) => {
			
			service.getPopularGames( (err, popularGames) => {
					
				if (!err) {
					const answer = { 'PopularGames': popularGames  }
					res.json(answer);
						
				} else {
						
					switch (err) {
						case error.EXTERNAL_SERVICE_FAILURE:
							res.status(502).json({ cause: 'External service failure.' })
							break;
						default:
							res.status(500).json({ cause: 'Failed to get games.'})
							break;
					}
						
				}
			})
				
		},
			
		searchGames: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const gameName = body	
				
				service.searchGames(gameName, (err, games) => {
						
					if (!err) {
						const answer = { 'Games': games }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		},
		
		createGroup: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupName = body.split(';')[0].replace(/\n/g,' ').trim()
				let groupDescription = ''
				if ( body.includes(';')){
					groupDescription = body.split(';')[1].replace(/\n/g,' ').trim()
				}
				
				service.createGroup(groupName, groupDescription, (err, group) => {
						
					if (!err) {
						const answer = { 'Group': group }
						res.json(answer)
					} else {
						
						switch (err) {
							case error.MISSING_ARGUMENT:
								res.status(400).json({ cause: 'Missing argument.' })
								break;
							default:
								res.status(500).json({ cause: 'Failed to create group.'})
								break;
						}
						
					}
				})
					
			})
					
				
		},
		
		listGroups: ( req, res ) => {
				
			service.listGroups((err, groups) => {
						
				if (!err) {
					const answer = { 'Groups': groups }
					res.json(answer)
				} else {
						
					switch (err) {
						default:
							res.status(500).json({ cause: 'Failed to get groups.'})
							break;
					}
						
				}
			})
					
				
		},
		
		editGroup: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupID = body.split(';')[0].replace(/\n/g,' ').trim()
				let groupParameter =''
				let groupEdit =''
				if ( body.split(';').length >= 3){
					groupParameter = body.split(';')[1].replace(/\n/g,' ').trim()
					groupEdit= body.split(';')[2].replace(/\n/g,' ').trim()
				}
				
				
				service.editGroup(groupID, groupParameter, groupEdit, (err, group) => {
						
					if (!err) {
						const answer = { 'Group': group }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		},
		
		showGroup: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupID = body
				
				service.showGroup(groupID, (err, group) => {
						
					if (!err) {
						const answer = { 'Group': group }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		},
		
		addGame: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupID = body.split(';')[0].replace(/\n/g,' ').trim()
				let gameID = ''
				if ( body.includes(';')){
					gameID = body.split(';')[1].replace(/\n/g,' ').trim()
				}
				
				service.addGame(groupID, gameID, (err, group) => {
						
					if (!err) {
						const answer = { 'Group': group }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		},
		
		removeGame: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupID = body.split(';')[0].replace(/\n/g,' ').trim()
				let gameID = ''
				if ( body.includes(';')){
					gameID = body.split(';')[1].replace(/\n/g,' ').trim()
				}
				
				service.removeGame(groupID, gameID, (err, group) => {
						
					if (!err) {
						const answer = { 'Group': group }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		},
		
		gamesByRating: ( req, res ) => {
				
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const groupID = body.split(';')[0].replace(/\n/g,' ').trim()
				let minRating =''
				let maxRating =''
				if ( body.split(';').length >= 3){
					minRating = body.split(';')[1].replace(/\n/g,' ').trim()
					maxRating = body.split(';')[2].replace(/\n/g,' ').trim()
				}
				
				service.gamesByRating(groupID, minRating, maxRating, (err, games) => {
						
					if (!err) {
						const answer = { 'Games': games }
						res.json(answer)
					} else {
						
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
						
					}
				})
					
			})
					
				
		}
		
	}
	
	app.get('/popularGames', theWebApi.PopularGames)
	app.post('/searchGames', theWebApi.searchGames)
	app.post('/createGroup', theWebApi.createGroup)
	app.get('/listGroups', theWebApi.listGroups)
	app.post('/editGroup', theWebApi.editGroup)
	app.post('/showGroup', theWebApi.showGroup)
	app.post('/addGame', theWebApi.addGame)
	app.post('/removeGame', theWebApi.removeGame)
	app.post('/gamesByRating', theWebApi.gamesByRating)

	
	return theWebApi
	
}

module.exports = webapi