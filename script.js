const API_KEY = 'тут_твій_API_KEY'; 
const BASE_URL = 'https://pixabay.com/api/'; 
async function fetchResults(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    PNotify.error({ text: 'Помилка при завантаженні даних' });
    console.error(error);
  }
}
function createCardTemplate(item) {
  return `
    <div class="card" style="border:1px solid #ccc; padding:10px; margin:10px; display:inline-block; width:200px;">
      <img src="${item.webformatURL}" alt="${item.tags}" style="width:100%; height:auto;" />
      <h3>${item.tags}</h3>
      <p>Likes: ${item.likes} | Views: ${item.views}</p>
    </div>
  `;
}
function renderResults(items) {
  const container = document.getElementById('results-container');
  container.innerHTML = items.map(createCardTemplate).join('');
}
const form = document.getElementById('search-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;
  const data = await fetchResults(query);
  if (data && data.hits && data.hits.length > 0) {
    renderResults(data.hits);
  } else {
    PNotify.info({ text: 'Нічого не знайдено' });
  }
});
