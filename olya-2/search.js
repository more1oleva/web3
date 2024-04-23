function searchJobs() {
    const searchText = document.getElementById('searchInput').value;
    const apiUrl = 'https://api.hh.ru/vacancies';
    const params = {
        text: searchText,
        page: 0,
        per_page: 10
    };
    
    axios.get(apiUrl, { params })
        .then(function (response) {
            displayResults(response.data.items);
        })
        .catch(function (error) {
            console.error('Ошибка запроса:', error);
            document.getElementById('results').innerHTML = '<div class="alert alert-danger" role="alert">Ошибка поиска. Проверьте ваш запрос или попробуйте позже.</div>';
        });
}

function displayResults(jobs) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    if (jobs.length === 0) {
        resultsContainer.innerHTML = '<div class="alert alert-warning" role="alert">Вакансий по вашему запросу не найдено.</div>';
        return;
    }
    
    jobs.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-card';
        jobElement.innerHTML = `<h5 class="card-title">${job.name}</h5><p class="card-text">${job.snippet.requirement}</p>`;
        resultsContainer.appendChild(jobElement);
    });
}