'use strict'

const urllib = require('urllib')

const error = require('./covida-errors.js')

module.exports = {

	getPopularGames: function (done) {
		
		urllib.request('https://api.igdb.com/v4/games', {
			method: 'POST',
			headers: {
				'Client-ID': 'rrk0oqytwlxp6vuhe625zfrmj9x47c',
				'Authorization': 'Bearer 5zcgfq49fu786y8ijxgtmcci3zg2ph'
			},
			data: 'fields name,rating; sort rating desc; where rating != null;',
			
		},
		(err, data, res) => {
				if (!err) {
					if (res.statusCode == 200) {
						
					done(null, JSON.parse(data))
				
					} else {
						done(error.EXTERNAL_SERVICE_FAILURE)
					}
				} else {
					done(error.EXTERNAL_SERVICE_FAILURE)
				}
			}
		)
		
	},
	
	searchGames: function (gameName, done) {
		
		urllib.request('https://api.igdb.com/v4/games', {
			method: 'POST',
			headers: {
				'Client-ID': 'rrk0oqytwlxp6vuhe625zfrmj9x47c',
				'Authorization': 'Bearer 5zcgfq49fu786y8ijxgtmcci3zg2ph'
			},
			data: 'search "' + gameName + '"; fields name,rating;',
			
		},
		(err, data, res) => {
				if (!err) {
					if (res.statusCode == 200) {
						
					done(null, JSON.parse(data))
				
					} else {
						
						done(error.EXTERNAL_SERVICE_FAILURE)
					}
				} else {
					
					done(error.EXTERNAL_SERVICE_FAILURE)
				}
			}
		)
		
	},
	
	searchGameByID: function (gameID, done) {
		
		urllib.request('https://api.igdb.com/v4/games', {
			method: 'POST',
			headers: {
				'Client-ID': 'rrk0oqytwlxp6vuhe625zfrmj9x47c',
				'Authorization': 'Bearer 5zcgfq49fu786y8ijxgtmcci3zg2ph'
			},
			data: 'fields name,rating; where id = ' + gameID + ';',
			
		},
		(err, data, res) => {
				if (!err) {
					if (res.statusCode == 200) {
						
					done(null, JSON.parse(data))
				
					} else {
						
						done(error.EXTERNAL_SERVICE_FAILURE)
					}
				} else {
					
					done(error.EXTERNAL_SERVICE_FAILURE)
				}
			}
		)
		
	}
	
}