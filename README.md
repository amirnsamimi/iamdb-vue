# Movie Search App

A Vue.js application to search for movies and display their details, sourced from IMDb.

## Features
- **Movie Search**: Type any movie title and retrieve detailed information including IMDb rating, year, director, and country.
- **Genre Filter**: Filter the results based on genres to narrow down your search.
- **Favorites**: Mark movies as favorites and access them easily from the favorites section.
- **Rating Display**: Visualize the IMDb rating with a circular rating indicator for quick reference.
- **Image Placeholders**: BlurHash is used to display image placeholders, improving perceived load time.
- **Intersection Observer**: Improves performance by lazy-loading movies as you scroll through the list.

## Components
- **BlurHash.vue**: Displays a blurred image placeholder until the full movie image is loaded.
- **Favorite.vue**: Allows users to mark/unmark a movie as a favorite.
- **Genres.vue**: Displays the genres associated with a movie and allows filtering by genre.
- **ListItem.vue**: Displays movie details such as title, poster, and IMDb rating in a list format.
- **RatingCircle.vue**: A circular progress indicator that visualizes the movie's IMDb rating.
- **Search.vue**: A search bar component for finding movies.
- **Tags.vue**: Displays relevant tags and categories associated with a movie.

## Views
- **Home.vue**: The homepage with a search bar and genre filter.
- **Movie.vue**: Displays detailed information about a single movie, including title, director, and rating.
- **MoviesList.vue**: Shows a list of movies based on search or genre selection.

## Technologies Used
Vue.js 3: Front-end framework for building interactive UIs.
Vue Router: Managing routing between the different views (home, movie details, etc.).
TypeScript: Used for type safety and better development experience.
Pinia/Vuex: For global state management, handling favorites, and search results.
BlurHash: For generating and displaying image placeholders.
IMDb API: Movie data source, including details such as title, year, rating, and more.

## Contributing
Feel free to fork this project and submit pull requests for improvements or additional features.

## License
This project is licensed under the MIT License.

## Setup

### Install dependencies
npm install

 Building Project 
npm run build





