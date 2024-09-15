export const API_CONFIG: { [key: string]: string } = {
    BASE_URL: import.meta.env.VITE_APP_API_URL,
  };

export const MOVIE_APIS: { [key: string]: string } = {
   GENRES: '/v1/genres', 
   MOVIES: '/v1/movies', //?q={name}&page={page}, ?page={page}, /{movie_id}, 
};