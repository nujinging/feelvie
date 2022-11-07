import axios from "axios";

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "cb772a50acc4cd6917b12854484b9d91",
    language: "ko-KR",
  },

});
export const movieApi = {
  nowPlaying: () => request.get("movie/now_playing"),
  popular: () => request.get("movie/popular"),
  TopRated: () => request.get("movie/top_rated"),
  genre: () =>  request.get(`genre/movie/list`),
  genreList: (value) =>  request.get(`discover/movie?with_genres=${value}`),
  search: (keyword) =>
    request.get("search/movie", {
      params: {
        query: keyword,
      },
    }),
    movieDetail: (id) =>
    request.get(`movie/${id}`, {
      params: { append_to_response: "videos" },
    }),
};