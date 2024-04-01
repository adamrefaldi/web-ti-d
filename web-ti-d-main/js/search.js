document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const content = document.getElementById('content');

    function filterContent() {
        const query = searchInput.value.toLowerCase();
        const filteredContent = Array.from(content.children).filter(child => {
            return child.textContent.toLowerCase().includes(query);
        });

        displayResults(filteredContent);
    }

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length) {
            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = result.textContent;
                searchResults.appendChild(li);

                li.addEventListener('click', () => {
                    navigateToSearchResult(li.textContent.trim());
                });
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No results found.';
            searchResults.appendChild(li);
        }
    }

    function navigateToSearchResult(selectedValue) {
        window.location.href = `hasil_pencarian.html?q=${selectedValue}`;
    }

    searchInput.addEventListener('input', filterContent);

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            navigateToSearchResult(searchInput.value.trim());
        }
    });
});
