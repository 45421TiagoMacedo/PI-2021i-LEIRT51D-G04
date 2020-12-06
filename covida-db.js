'use strict'

const error = require('./covida-errors.js')

let db = null
let id = 0

module.exports = {
	
	listGroups: function (done) {
		setImmediate(() => {
			done(null, db)
		})
	},
	
	createGroup: function (groupName, groupDescription, done) {
		setImmediate(() => {
			const groups = db || []
			const group = { id : id++, Name : groupName, Description : groupDescription, Games : [] };
			groups.push(group)
			db = groups
			done(null, group)
		})
	},
	
	editGroup: function (groupID, groupParameter, groupEdit, done) {
		setImmediate(() => {
			if(db == null ) { done(error.WRONG_ID) }else{
				const group = db.find(g => g.id == groupID)
				if(group){ 
					if(groupParameter == 'Name'){
						group.Name = groupEdit
						done(null, group)
					}else if(groupParameter == 'Description'){
						group.Description = groupEdit
						done(null, group)
					}else{
						done(error.WRONG_ARGUMENT)
					}
				}else{
					done(error.WRONG_ID)
				}
			}
		})
	},
	
	showGroup: function (groupID, done) {
		setImmediate(() => {
			if(db == null ) { done(error.WRONG_ID) } else{
				const group = db.find(g => g.id == groupID)
				if(group){ 
					done(null, group) 
				}else{
					done(error.WRONG_ID)
				}
			}
		})
	},
	
	addGame: function (groupID, gameID, game, done) {
		setImmediate(() => {
			if(db == null ) { done(error.WRONG_ID) } else{
				const group = db.find(g => g.id == groupID)
				if(group){ 
					const gm = group.Games.find(g => g.id == gameID)
					if(!gm){
						group.Games = group.Games.concat(game)
						done(null, group) 
					}else{
						done(error.WRONG_ARGUMENT)
					}
				}else{
					done(error.WRONG_ID)
				}
			}
		})
	},
	
	removeGame: function (groupID, gameID, done) {
		setImmediate(() => {
			if(db == null ) { done(error.WRONG_ID) } else{
				const group = db.find(g => g.id == groupID)
				if(group){ 
					const oldSize = group.Games.length
					group.Games = group.Games.filter( function(gm){
						return gm.id != gameID
					})
					if(oldSize != group.Games.length){
						done(null, group) 
					}else{
						done(error.WRONG_ARGUMENT) 
					}
				}else{
					done(error.WRONG_ID)
				}
			}
		})
	},
	
	gamesByRating: function (groupID, minRating, maxRating, done) {
		setImmediate(() => {
			if(db == null ) { done(error.WRONG_ID) } else{
				const group = db.find(g => g.id == groupID)
				if(group){ 
					if(maxRating >= 0 && minRating >= 0 && maxRating <= 100 && minRating <= 100 && minRating <= maxRating){
						let games = group.Games.filter( function(gm){
							return gm.rating >= minRating && gm.rating <= maxRating
						})
						games = games.sort((gm1 ,gm2) => gm2.rating-gm1.rating)
						done(null, games) 
					}else{
						done(error.WRONG_ARGUMENT) 
					}
				}else{
					done(error.WRONG_ID)
				}
			}
		})
	}
}