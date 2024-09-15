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
  metadata: {
    current_page: string;
    page_count: number;
    per_page: number;
    total_count: number;
  };
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

export interface IMETADATA {
  current_page: string;
  page_count: number;
  per_page: number;
  total_count: number;
}
