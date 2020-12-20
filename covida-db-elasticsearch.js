'use strict'

const fetch = require('node-fetch')

const error = require('./covida-errors.js')

function storage(host, port) {
	
	const baseUrl = `http://${host}:${port}`
	
	const itemsBaseUrl = `${baseUrl}/covida`
	
	const theStorage = {
		
		listGroups: () => {
			return fetch(`${itemsBaseUrl}/_search`)
				.then( response => response.json())
				.then( answer => answer.hits.hits.map(hit => {
					let group = hit._source
					group["id"] = hit._id
					return group
				}))
		},

		createGroup: (groupName, groupDescription) => {
			return fetch(`${itemsBaseUrl}/_doc`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"name": groupName, "description": groupDescription, "games" : []
					})
				}).then( response => response.json())
				.then(answer => answer._id)
		},
		
		editGroup: (groupID, groupParameter, groupEdit) => {
			if(groupParameter == 'Name' ){
				return fetch(`${itemsBaseUrl}/_update/${groupID}?refresh=true`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"doc" : { "name" : groupEdit }
					})
				}).then(r => fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				})
				).then( response => response.json())
				.then(answer => {
					if (!answer.found){ return Promise.reject(error.WRONG_ID)}
					return answer._source
				})
			}else if(groupParameter == 'Description'){
				return fetch(`${itemsBaseUrl}/_update/${groupID}?refresh=true`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"doc" : { "description" : groupEdit }
					})
				}).then(r => fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				})
				).then( response => response.json())
				.then(answer => {
					if (!answer.found){ return Promise.reject(error.WRONG_ID)}
					return answer._source
				})
			}
			return Promise.reject(error.WRONG_ARGUMENT)
		},
	
		showGroup: (groupID) => {
			return fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
					method: 'GET',
					headers: {
						"Content-Type": "application/json"
					}
				}).then( response => response.json())
				.then(answer => {
					if (!answer.found){ return Promise.reject(error.WRONG_ID)}
					return answer._source
				})
		},
	
		addGame: (groupID, gameID, game) => {
			return fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				}
			}).then( response => response.json())
			.then(answer => {
				if (!answer.found){ return Promise.reject(error.WRONG_ID)}
				let group = answer._source
				const gm = group.games.find(g => g.id == gameID)
				if(!gm){
					group.games = group.games.concat(game)
					fetch(`${itemsBaseUrl}/_update/${groupID}?refresh=true`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"doc" : { "games" : group.games }
						})
					})
					return group
				}
				return Promise.reject(error.WRONG_ARGUMENT)
			})
		},
	
		removeGame: (groupID, gameID) => {
			return fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				}
			}).then( response => response.json())
			.then(answer => {
				if (!answer.found){ return Promise.reject(error.WRONG_ID)}
				let group = answer._source
				const oldSize = group.games.length
				group.games = group.games.filter( function(gm){
					return gm.id != gameID
				})
				if(oldSize == group.games.length){ return Promise.reject(error.WRONG_ARGUMENT) }
				fetch(`${itemsBaseUrl}/_update/${groupID}?refresh=true`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"doc" : { "games" : group.games }
					})
				})
				return group
			})
		},
	
		gamesByRating: (groupID, minRating, maxRating) => {
			return fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				}
			}).then( response => response.json())
			.then(answer => {
				if (!answer.found){ return Promise.reject(error.WRONG_ID)}
				let group = answer._source
				if(maxRating >= 0 && minRating >= 0 && maxRating <= 100 && minRating <= 100 && minRating <= maxRating){
					let games = group.games.filter( function(gm){
						return gm.rating >= minRating && gm.rating <= maxRating
					})
					games = games.sort((gm1 ,gm2) => gm2.rating-gm1.rating)
					return games
				}
				return Promise.reject(error.WRONG_ARGUMENT) 
			})
		},
	
		removeGroup: (groupID) => {
			return fetch(`${itemsBaseUrl}/_doc/${groupID}`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json"
				}
			}).then( response => response.json())
			.then(answer => {
				if(answer.result == 'not_found'){return Promise.reject(error.WRONG_ID)}
			})
		}
		
	}
	
	return theStorage

}

module.exports = storage