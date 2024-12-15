const API_KEY = '3ebd6f83aaefd5d663185c7d4a89171c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const GENRES = {
    horror: 27,
    family: 10751,
    drama: 18,
    comedy: 35,
    action: 28,
};

const MOVIES_PER_PAGE = 6;
const currentPages = {};

let queue = JSON.parse(localStorage.getItem('movieQueue')) || [];

function updateQueueStorage(movieTitle) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        showAlert('Please log in to add movies to your queue!', 'error');
        return;
    }

    if (!queue.includes(movieTitle)) {
        queue.push(movieTitle);
        localStorage.setItem('movieQueue', JSON.stringify(queue));
        showAlert(`${movieTitle} added to your queue!`, 'success');
    } else {
        showAlert(`${movieTitle} is already in your queue!`, 'warning');
    }
    updateQueueDisplay();
}


function updateQueueDisplay() {
    const queueContainer = document.getElementById('movie-queue');
    const queueCount = document.getElementById('queue-count');

    if (!queueContainer || !queueCount) {
        console.error('Queue container or count element not found.');
        return;
    }

    queue = JSON.parse(localStorage.getItem('movieQueue')) || [];

    queueContainer.innerHTML = '';
    queueCount.textContent = queue.length;

    queue.forEach((movie, index) => {
        const queueItem = document.createElement('div');
        queueItem.className = 'queue-item';
        queueItem.innerHTML = `
            <span>${index + 1}. ${movie}</span>
            <button class="remove-from-queue" data-movie="${movie}">Remove</button>
        `;
        queueContainer.appendChild(queueItem);
    });
}

//  queue management
document.body.addEventListener('click', (e) => {
    const currentUser = localStorage.getItem('currentUser');
    
    if (e.target.classList.contains('add-to-queue')) {
        if (!currentUser) {
            showAlert('Please log in to add movies to your queue!', 'error');
            return;
        }

        const movieElement = e.target.closest('.movie');
        if (movieElement) {
            const movieTitle = movieElement.querySelector('strong').textContent;
            updateQueueStorage(movieTitle);
        }
    } else if (e.target.classList.contains('remove-from-queue')) {
        if (!currentUser) {
            showAlert('Please log in to manage your queue!', 'error');
            return;
        }

        const movieTitle = e.target.dataset.movie;

        queue = queue.filter((movie) => movie !== movieTitle);
        localStorage.setItem('movieQueue', JSON.stringify(queue));

        updateQueueDisplay();
    }
});



async function fetchMoviesByGenre(genreId, sectionId, page = 1) {
    try {
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31&page=${page}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }

        const data = await response.json();
        displayMovies(data.results, sectionId, page, data.total_pages);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies, sectionId, currentPage, totalPages) {
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`Section with ID '${sectionId}' not found.`);
        return;
    }

    section.innerHTML = '';

    if (!movies.length) {
        section.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

    movies.slice(0, MOVIES_PER_PAGE).forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const imageUrl = movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : './assets/placeholder.jpg';

        const truncateDescription = (text, maxLength) => {
            if (!text) return 'No description available.';
            if (text.length <= maxLength) return text;
            const truncated = text.substr(0, text.lastIndexOf(' ', maxLength));
            return truncated + '...';
        };

        const description = truncateDescription(movie.overview, 100);

        movieElement.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <p><strong>${movie.title}</strong></p>
            <p class="description">${description}</p>
            <button class="add-to-queue">Add to Queue</button>
        `;

        section.appendChild(movieElement);
    });

    addPagination(section, sectionId, currentPage, totalPages);
}


function addPagination(section, sectionId, currentPage, totalPages) {
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            fetchMoviesByGenre(GENRES[sectionId], sectionId, currentPage - 1);
        });
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            fetchMoviesByGenre(GENRES[sectionId], sectionId, currentPage + 1);
        });
        paginationContainer.appendChild(nextButton);
    }

    section.appendChild(paginationContainer);
}

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(GENRES).forEach((genre) => {
        currentPages[genre] = 1;
        fetchMoviesByGenre(GENRES[genre], genre, currentPages[genre]);
    });
    updateQueueDisplay();
});
