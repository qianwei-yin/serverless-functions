require('dotenv').config();
const axios = require('axios');

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial&q=`;

https: exports.handler = async (event, context) => {
	if (event.httpMethod !== 'POST') {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 405,
			body: 'Only POST requests allowed',
		};
	}

	const { city } = JSON.parse(event.body);
	try {
		const { data } = await axios.get(`${url}${city}`);
		console.log(data);
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 200,
			body: JSON.stringify(data),
		};
	} catch (error) {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 404,
			body: JSON.stringify(error),
		};
	}
};
