const resultEl = document.querySelector('.result');

const fetchProduct = async () => {
	try {
		const id = window.location.search;
		// const { data } = await axios.get(`/api/product${id}`);
		const { data } = await axios.get(`/api/airtable-combine${id}`);

		resultEl.innerHTML = `<h1 class="title">Single Product</h1>
		<article class="product">
			<img
				class="product-img"
				src=${data.url}
				alt=${data.name}
			/>
			<div class="product-info">
				<h5 class="title">${data.name}</h5>
				<h5 class="price">$${(data.price / 100).toFixed(2)}</h5>
				<p class="desc">
					${data.description}
				</p>
			</div>
		</article>`;
	} catch (error) {
		// Other errors are handling in the /.netlify/functions
		resultEl.innerHTML = `<h2>${error.response.data}</h2>`;
	}
};

fetchProduct();
