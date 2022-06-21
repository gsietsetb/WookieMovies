export interface Movie {
  favorite: boolean;
  backdrop: string; // "https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg"
  cast: Array<string>; //["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  classification: string; //"13+"
  director: string; // "Christopher Nolan"
  genres: Array<string>; // ["Action", "Crime", "Drama"]
  id: string; // "d6822b7b-48bb-4b78-ad5e-9ba04c517ec8"
  imdb_rating: number; //  9
  length: string; //  "2h 32min"
  overview: string; // "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
  poster: string; //  "https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg"
  released_on: Date; //"2008-07-16T00:00:00"
  slug: string; // "the-dark-knight-2008"
  title: string; // "The Dark Knight"
}

export type MoviesList = Array<Movie>;
export interface BackendMoviesList {
  movies: MoviesList;
}

export interface CategoryMap {
  [key: string]: MoviesList;
}
