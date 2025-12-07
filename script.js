const moviesGrid = document.getElementById('movies');
const searchInput = document.getElementById('search');
const API_KEY = '72118b9a'; // OMDB API key
let timeoutId;

searchMovies("Spider");

searchInput.addEventListener('input', (e) => { //Event listner for Search input 
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            searchMovies(searchTerm);
        } else {
            fetchPopularMovies();
        }
    }, 500);
});

async function searchMovies(searchTerm) {
    try {
        moviesGrid.innerHTML = '<div class="loading">Loading...</div>';
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            showError("No movies found!");
        }
    } catch (error) {
        showError("Something went wrong! Please try again later.");
    }
}


// Function to display movies in the grid
function displayMovies(movies) {
    let movieCards = '';
    for (let i = 0; i < movies.length; i++) {
        movieCards += createMovieCard(movies[i]);
    }
    moviesGrid.innerHTML = movieCards;

}

function createMovieCard(movie) {
    const poster = movie.Poster === 'N/A' ? './images/no-image-available.png' : movie.Poster;
    return `
        <div class="movie-card">
            <img src="${poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        </div>
    `;
}

// Function to show an error message
function showError(message) {
    moviesGrid.innerHTML = `<div class="error">${message}</div>`;
}

