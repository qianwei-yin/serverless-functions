require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE).table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context) => {
	const { id } = event.queryStringParameters;

	if (id) {
		try {
			const data = await airtable.retrieve(id);
			if (data.error) {
				return {
					headers: {
						'Access-Control-Allow-Origin': '*',
					},
					statusCode: 404,
					body: `There is no product with id ${id}`,
				};
			}

			const {
				fields: { name, description, price, images },
			} = data;
			const { url } = images[0];

			const product = { id, name, description, price, url };

			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 200,
				body: JSON.stringify(product),
			};
		} catch (error) {
			return {
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				statusCode: 500,
				body: `Server Error`,
			};
		}
	}

	return {
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		statusCode: 400,
		body: 'Please provide id',
	};
};
