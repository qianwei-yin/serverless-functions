const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

const fetchData = async () => {
	try {
		const { data } = await axios.get('/api/survey');
		const response = data
			.map((item) => {
				const { id, room, votes } = item;

				return `<li>
            <div class="key">${room.toUpperCase().substring(0, 2)}</div>
            <div>
            <h4>${room}</h4>
            <p class="vote-${id}" data-votes="${votes}">${votes} votes</p>
            </div>
            <button data-id="${id}">
            <i class="fas fa-vote-yea"></i>
            </button>
            </li>`;
			})
			.join('');

		result.innerHTML = response;
	} catch (error) {}
};

window.addEventListener('load', () => {
	fetchData();
});

result.addEventListener('click', async (e) => {
	if (e.target.classList.contains('fa-vote-yea')) {
		const id = e.target.parentElement.dataset.id;
		const voteNode = result.querySelector(`.vote-${id}`);
		const votes = voteNode.dataset.votes;

		const newVotes = await modifyData(id, votes);

		title.textContent = 'Survey';
		if (newVotes) {
			voteNode.textContent = `${newVotes} votes`;
			voteNode.dataset.votes = newVotes;
		}
	}
});

async function modifyData(id, votes) {
	title.textContent = 'Loading...';
	try {
		const { data } = await axios.put('/api/survey', { id, votes });
		const newVotes = data.fields.votes;
		return newVotes;
	} catch (error) {
		console.log(error.response);
		return null;
	}
}
