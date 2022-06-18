export const BASE_URL = 'https://wookie.codesubmit.io/movies';
export const SEARCH_URL = 'https://wookie.codesubmit.io/movies';
export const bearerHeader = 'Authorization: Bearer Wookie2019';

export const fetchConfig: RequestInit = {
  method: 'GET',
  headers: new Headers({Authorization: 'Bearer Wookie2019'}),
};
