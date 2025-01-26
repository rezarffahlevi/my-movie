# Web Application Technical Test - Movie Explorer

This web application, **Movie Explorer**, allows users to explore movies fetched from the TMDB (The Movie Database) API. The app includes features like searching for movies, viewing detailed information about each movie, and infinite scrolling to load more movie data.

## Features

### 1. **Display Movie List**
   - Fetches movie data from the TMDB API and displays it on the main page.
   - Each movie is displayed in a card format, showing:
     - **Title**
     - **Release Year**
     - **Poster**
   - The movie card links to a detailed movie page with more information.

### 2. **Movie Search**
   - Users can search for movies by title.
   - Displays a list of movies that match the search query in real-time as the user types.

### 3. **Movie Categories Filtering**
   - Users can filter movies based on predefined categories:
     - **Now Playing**
     - **Popular**
     - **Top Rated**
     - **Upcoming**
   - Clicking on a category fetches and displays movies from that category.

### 4. **Movie Detail Page**
   - Clicking on a movie card directs the user to a detailed movie page.
   - The movie detail page includes:
     - **Movie Synopsis**
     - **Main Cast**
     - **Director**
     - **Poster**
   - A **Back** button is available to navigate back to the movie list.

### 5. **Infinite Scroll for Pagination**
   - Infinite scrolling 
