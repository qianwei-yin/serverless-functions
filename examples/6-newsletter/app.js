const form = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const alert = document.querySelector('.alert');
alert.style.display = 'none';

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	alert.style.display = 'none';
	form.classList.add('loading');
	const email = emailInput.value;

	try {
		await axios.post('/api/newsletter', { email });
		form.innerHTML = '<h4 class="success">Success! Please check your email.</h4>';
	} catch (error) {
		console.log(error.response);
		alert.style.display = 'block';
		alert.textContent = 'Something went wrong. Please try again.';
	}
	form.classList.remove('loading');
});
