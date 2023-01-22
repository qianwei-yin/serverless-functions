const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const alert = document.querySelector('.alert');
const result = document.querySelector('.result');
alert.style.display = 'none';

form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const city = input.value;
	if (city) {
		await getWeatherData(city);
	}
});

async function getWeatherData(city) {
	alert.style.display = 'none';
	try {
		const { data } = await axios.post('/api/weather', { city });
		console.log(data);

		const {
			name,
			sys: { country },
			main: { feels_like, temp_max, temp_min },
			weather,
		} = data;
		const desc = weather[0].description;

		result.innerHTML = `
        <article class="card">
        <h3>${name}, ${country}</h3>
        <p>${desc}</p>
        <p>min temp: ${temp_min}&#8457</p>
        <p>max temp: ${temp_max}&#8457</p>
        <p>feels like: ${feels_like}&#8457</p>
        </article>
        `;
	} catch (error) {
		// console.log(error.response);
		alert.style.display = 'block';
		alert.textContent = `Can not find weather data for city : "${city}"`;
	}
}
