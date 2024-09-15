export interface IGENRES {
  id: number;
  name: string;
}

export interface IMOVIES {
  data: {
    id: number;
    title: string;
    poster: string;
    year: number;
    director: string;
    country: string;
    imdb_rating: string;
    imdb_votes: string;
    imdb_id: string;
    genres: string[];
  }[];
  metadata: {};
}

export interface IMOVIE {
  id: number;
  title: string;
  poster: string;
  year: number;
  director: string;
  country: string;
  imdb_rating: string;
  imdb_votes: string;
  imdb_id: string;
  genres: string[];
}
