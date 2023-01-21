const items = require('../assets/data.js');

exports.handler = async (event, context) => {
	return {
		// Fix CORS error
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		statusCode: 200,
		body: JSON.stringify(items),
	};
};
