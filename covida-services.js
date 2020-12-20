'use strict'

const error = require('./covida-errors.js')

function service(db, data) {
	
	const theService = {
		
		getPopularGames: () => {
			return new Promise((resolve, reject) =>	{
				resolve(data.getPopularGames())
			})
		},
		
		searchGames: (gameName) => {
			return new Promise((resolve, reject) =>	{
				if ( gameName && gameName.trim()) {
					resolve(data.searchGames(gameName))
				}else{
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		createGroup: (groupName, groupDescription) => {
			return new Promise((resolve, reject) =>	{
				if ( groupName && groupName.trim()) {
					resolve(db.createGroup(groupName.trim(), groupDescription.trim()))
				}else{
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		listGroups: () => {
			return new Promise((resolve, reject) =>	{
				resolve(db.listGroups())
			})
		},
		
		editGroup: (groupID, groupParameter, groupEdit) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID && groupParameter && groupEdit && groupID.trim()) {
					resolve(db.editGroup(groupID, groupParameter.trim(), groupEdit.trim()))
				}else {
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		showGroup: (groupID) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID &&  groupID.trim()) {
					resolve(db.showGroup(groupID))
				}else {
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		addGame: (groupID, gameID) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID && gameID && groupID.trim() && gameID.trim()) {
					data.searchGameByID(gameID).then(game => resolve(db.addGame(groupID, gameID, game)))
				}else {
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		removeGame: (groupID, gameID) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID && gameID && groupID.trim() && gameID.trim()) {
					resolve(db.removeGame(groupID, gameID))
				}else {
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		gamesByRating: (groupID, minRating, maxRating) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID && maxRating && minRating && groupID.trim() && maxRating.trim() && minRating.trim()) {
					resolve(db.gamesByRating(groupID, parseInt(minRating), parseInt(maxRating)))
				}else{
					reject(error.MISSING_ARGUMENT)
				}
			})
		},
		
		removeGroup: (groupID, resFunc) => {
			return new Promise((resolve, reject) =>	{
				if ( groupID && groupID.trim()) {
					resolve(db.removeGroup(groupID))
				}else {
					reject(error.MISSING_ARGUMENT)
				}
			})			
		}
		
	}
	
	return theService
}

module.exports = service