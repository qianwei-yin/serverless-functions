require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE).table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context) => {
	try {
		const { records } = await airtable.list();
		const products = records.map((product) => {
			const { id } = product;
			const { name, images, price } = product.fields;
			const { url } = images[0];
			return { id, name, url, price };
		});

		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 200,
			body: JSON.stringify(products),
		};
	} catch (error) {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 500,
			body: 'Server error',
		};
	}
};
