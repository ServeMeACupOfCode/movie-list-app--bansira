# movie-list-app--bansira

 HomeScreen Component
Overview
The HomeScreen component is a React Native functional component that fetches and displays a list of top movies from the IMDb API. The component allows users to search, filter by genre, and navigate to IMDb pages for individual movies.

Features
Fetch Movies: Retrieve movies from the IMDb API and store them in the state.
Search Functionality: Filter movies based on a search query.
Genre Filtering: Filter movies by selected genres.
Pagination: Fetch more movies based on the direction (next or previous).
Movie Details: Open IMDb page for a selected movie.

Components
Header: Displays the genres and search bar.
MovieList: Displays the list of movies.
LoadingIndicator: Shows a loading indicator when data is being fetched.

Installation
Clone the repository:
git clone https://github.com/your-username/movie-list-app--bansira.git
cd your-repo-name
npm install
npm start Or npm run android


API Key Setup
Sign Up: Go to [RapidAPI](https://rapidapi.com/rapihub-rapihub-default/api/imdb-top-100-movies/) and sign up.
Get API Key: Subscribe to the required API and copy your key from the "API Keys" section.
Update .env File: Open .env in the root directory and replace YOUR_RAPIDAPI_KEY_HERE with your key:
Replace Key if Needed: If your key is exhausted, get a new one and update the .env file.
