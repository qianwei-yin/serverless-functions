require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE).table('survey');

exports.handler = async (event, context) => {
	if (event.httpMethod === 'GET') {
		try {
			const { records } = await airtable.list();
			const survey = records.map((record) => {
				const {
					id,
					fields: { room, votes },
				} = record;

				return { id, room, votes };
			});

			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 200,
				body: JSON.stringify(survey),
			};
		} catch (error) {
			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 500,
				body: 'Server Error',
			};
		}
	}

	if (event.httpMethod === 'PUT') {
		try {
			// because event.body is a string
			const { id, votes } = JSON.parse(event.body);
			if (!id || !votes) {
				return {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
					statusCode: 400,
					body: 'Please provide id and votes values',
				};
			}

			const fields = { votes: Number(votes) + 1 };
			const item = await airtable.update(id, { fields });
			console.log(item);

			if (item.error) {
				return {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
					statusCode: 400,
					body: JSON.stringify(item),
				};
			}
			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 200,
				body: JSON.stringify(item),
			};
		} catch (error) {
			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 400,
				body: 'Please provide id and votes values',
			};
		}
	}

	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		statusCode: 405,
		body: 'Only GET and PUT requests allowed',
	};
};
