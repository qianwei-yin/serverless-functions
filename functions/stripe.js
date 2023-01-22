require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);

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

	const { purchase, total_amount, shipping_fee } = JSON.parse(event.body);
	console.log(purchase, total_amount, shipping_fee);

	const calculateOrderAmount = () => {
		// Replace this constant with a calculation of the order's amount
		// Calculate the order total on the server to prevent
		// people from directly manipulating the amount on the client
		return total_amount + shipping_fee;
	};

	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(),
			currency: 'usd',
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
		};
	} catch (error) {
		return {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
