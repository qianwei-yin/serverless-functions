require('dotenv').config();
const axios = require('axios');

const url = `https://api.buttondown.email/v1/subscribers`;

exports.handler = async (event, context) => {
	if (event.httpMethod !== 'POST') {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 405,
			body: 'Only POST method allowed',
		};
	}

	const { email } = JSON.parse(event.body);
	try {
		const data = await axios.post(
			url,
			{ email }
			// {
			// 	headers: { Authorization: `Token #{process.env.BUTTONDOWN_API_KEY}` },
			// }
		);
		console.log(data);

		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 201,
			body: 'Success',
		};
	} catch (error) {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 400,
			body: JSON.stringify(error.response.data),
		};
	}
};
