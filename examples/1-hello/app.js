const resultEl = document.querySelector('.result');

const fetchData = async () => {
	try {
		// const { data } = await axios.get('/.netlify/functions/hello');
		const { data } = await axios.get('/api/hello');
		resultEl.textContent = data;
	} catch (error) {
		console.log(error.response.data);
	}
};

fetchData();
