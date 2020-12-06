'use strict'

const assert = require('assert')

const serviceCreator = require('../covida-services.js')

describe('service', function () {
	describe('getPopularGames', function() {
		it('should return a json object', function (done) {
			// Arrange
			const game ={ "popularGames" : [
					{
						"id": 131887,
						"name": "Project +",
						"rating": 100.0
					},
					{
					  "id": 26974,
						"name": "Heartbound",
						"rating": 100.0
					},
					{
					  "id": 114283,
					   "name": "Persona 5 Royal",
					   "rating": 99.9639301031148
					}
			]
		  }
			const db = null
			const data = {
				getPopularGames:function (done) {
					done(null, game)
				}
			}
										
			const service = serviceCreator(db, data)
			
			// Act
			service.getPopularGames((err, obj) => {

				// Assert
				assert.equal(obj,game)
				
				done()
			})
		})
	}),
	
	describe('searchGames', function() {
		it('should return a json object', function (done) {
			// Arrange
			const game ={ "Games" : [
					{
						"id": 2946,
						"name": "FIFA 12"
					},
					{
						"id": 2153,
						"name": "FIFA 13"
					},
				]
			}
			const db = null
			const data = {
				searchGames:function (gameName, done) {
					done(null, game)
				}
			}
										
			const service = serviceCreator(db, data)
			
			// Act
			service.searchGames('fifa', (err, obj) => {

				// Assert
				assert.equal(obj,game)
				
				done()
			})
		})
	}),
	
	describe('createGroup', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescription",
					"Games": []
				}
			}
			
			const db = {
				createGroup:function (groupName, groupDescription, done) {
					done(null, group)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.createGroup('testName', 'testDescription',(err, obj) => {

				// Assert
				assert.equal(obj,group)
				
				done()
			})
		})
	}),
	
	describe('listGroups', function() {
		it('should return a json object', function (done) {
			// Arrange
			const groups ={ "Groups": [
					{
						"id": 0,
						"Name": "testName",
						"Description": "testDescription",
						"Games": []
					},
					{
						"id": 1,
						"Name": "testName",
						"Description": "testDescription",
						"Games": []
					}
				]
			}
			
			const db = {
				listGroups:function (done) {
					done(null, groups)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.listGroups((err, obj) => {

				// Assert
				assert.equal(obj,groups)
				
				done()
			})
		})
	}),
	
	describe('editGroup', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescriptionEdit",
					"Games": []
				}
			}
			
			const db = {
				editGroup:function (groupID, groupParameter, groupEdit, done) {
					done(null, group)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.editGroup("0", "Description", "testDescriptionEdit", (err, obj) => {

				// Assert
				assert.equal(obj, group)
				
				done()
			})
		})
	}),
	
	describe('showGroup', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescriptionEdit",
					"Games": []
				}
			}
			
			const db = {
				showGroup:function (groupID, done) {
					done(null, group)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.showGroup("0", (err, obj) => {

				// Assert
				assert.equal(obj, group)
				
				done()
			})
		})
	}),
	
	describe('addGame', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescriptionEdit",
					"Games": [
						{
							"id": 131887,
							"name": "Project +",
							"rating": 100.0
						}
					]
				}
			}
			
			const game ={ 
					"id": 131887,
					"name": "Project +",
					"rating": 100.0
			}
			
			const db = {
				addGame:function (groupID, gameID, game, done) {
					done(null, group)
				}
			}
			const data = {
				searchGameByID:function (gameID, done) {
					done(null, game)
				}
			}
										
			const service = serviceCreator(db, data)
			
			// Act
			service.addGame("0", "131887", (err, obj) => {

				// Assert
				assert.equal(obj, group)
				
				done()
			})
		})
	}),
	
	describe('removeGame', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescriptionEdit",
					"Games": []
				}
			}
			
			const db = {
				removeGame:function (groupID, gameID, done) {
					done(null, group)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.removeGame("0", "131887", (err, obj) => {

				// Assert
				assert.equal(obj, group)
				
				done()
			})
		})
	}),
	
	describe('gamesByRating', function() {
		it('should return a json object', function (done) {
			// Arrange
			const group ={ "Group": {
					"id": 0,
					"Name": "testName",
					"Description": "testDescriptionEdit",
					"Games": [
						{
							"id": 131887,
							"name": "Project +",
							"rating": 100.0
						},
						{
						  "id": 26974,
							"name": "Heartbound",
							"rating": 100.0
						},
						{
						  "id": 114283,
						   "name": "Persona 5 Royal",
						   "rating": 99.9639301031148
						}
					]
				}
			}
			
			const db = {
				gamesByRating:function (groupID, minRating, maxRating, done) {
					done(null, group)
				}
			}
			const data = null
										
			const service = serviceCreator(db, data)
			
			// Act
			service.gamesByRating("0", "90", "100", (err, obj) => {

				// Assert
				assert.equal(obj, group)
				
				done()
			})
		})
	})
	
	
})