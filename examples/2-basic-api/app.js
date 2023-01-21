const resultEl = document.querySelector('.result');

const fetchData = async () => {
	try {
		const { data } = await axios.get('/api/basic-api');
		resultEl.innerHTML = '';
		const products = data.forEach((product) => {
			const {
				image: { url },
				name,
				price,
			} = product;

			resultEl.insertAdjacentHTML(
				'beforeend',
				`
            <article class="product">
                <img
                    src=${url}
                    alt=${name}
                />
                <div class="info">
                    <h5>${name}</h5>
                    <h5 class="price">$${price}</h5>
                </div>
            </article>
            `
			);
		});
	} catch (error) {
		resultEl.innerHTML = `<h4>There was an error, please try again later...</h4>`;
	}
};

fetchData();
