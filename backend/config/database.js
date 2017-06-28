module.exports = {
	'development': {
		'username': 'root',
		'password': null,
		'database': 'bellezaNodeJS',
		'host': '127.0.0.1',
		'dialect': 'mysql',
		'define': {
			'timestamps': true,
			'underscored': true
		}
	},
	'production': {
		'username': process.env.DB_USERNAME || 'root',
		'password': process.env.DB_PASSWORD || null,
		'database': process.env.DB_NAME || 'bellezaNodeJS',
		'host': process.env.DB_HOST || '127.0.0.1',
		'dialect': 'mysql',
		'define': {
			'timestamps': true,
			'underscored': true
		}
	}
}
