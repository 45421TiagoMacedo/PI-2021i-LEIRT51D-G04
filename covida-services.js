'use strict'

const error = require('./covida-errors.js')

function service(db, data) {
	
	const theService = {
		
		getPopularGames: (resFunc) => {
			data.getPopularGames((err, popularGames) => {
				if (!err) {
					resFunc(null, popularGames)
				} else {
					resFunc(err)
				}
			})
			
		},
		
		searchGames: (gameName, resFunc) => {
			if ( gameName != '') {
				data.searchGames(gameName, (err, games) => {
					if (!err) {
						resFunc(null, games)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		createGroup: (groupName, groupDescription, resFunc) => {
			if ( groupName != '') {
				db.createGroup(groupName, groupDescription, (err, group) => {
					if (!err) {
						resFunc(null, group)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		listGroups: (resFunc) => {
				db.listGroups((err, group) => {
					if (!err) {
						resFunc(null, group)
					} else {
						resFunc(err)
					}
				})
			
		},
		
		editGroup: (groupID, groupParameter, groupEdit, resFunc) => {
			if ( groupID != '' && groupParameter != '' ) {
				db.editGroup(groupID, groupParameter, groupEdit, (err, group) => {
					if (!err) {
						resFunc(null, group)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		showGroup: (groupID, resFunc) => {
			if ( groupID != '' ) {
				db.showGroup(groupID, (err, group) => {
					if (!err) {
						resFunc(null, group)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		addGame: (groupID, gameID, resFunc) => {
			if ( groupID != '' && gameID != '') {
				data.searchGameByID(gameID, (err, game) => {
					if (!err) {
						db.addGame(groupID, gameID, game, (erro, group) => {
							if (!erro) {
								resFunc(null, group)
							} else {
								resFunc(erro)
							}
						})
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		removeGame: (groupID, gameID, resFunc) => {
			if ( groupID != '' && gameID != '') {
				db.removeGame(groupID, gameID, (err, group) => {
					if (!err) {
						resFunc(null, group)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		},
		
		gamesByRating: (groupID, minRating, maxRating, resFunc) => {
			if ( groupID != '' && maxRating != '' && minRating != '') {
				db.gamesByRating(groupID, minRating, maxRating, (err, games) => {
					if (!err) {
						resFunc(null, games)
					} else {
						resFunc(err)
					}
				})
			}else {
				
				resFunc(error.MISSING_ARGUMENT)
				
			}
			
		}
		
	}
	
	return theService
}

module.exports = service