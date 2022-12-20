import axios from "axios";

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "cb772a50acc4cd6917b12854484b9d91",
    language: "ko-KR",
  },

});
export const movieApi = {
  nowPlaying: (type, now) => request.get(`${type}/${now}`),
  popular: (type) => request.get(`${type}/popular`),
  TopRated: (type) =>  request.get(`${type}/top_rated`),


  // 장르 키워드
  genre: (value) =>  request.get(`genre/${value}/list`),
  // 장르 아이템 리스트
  genreList: (type, value, page) =>  request.get(`discover/${type}?with_genres=${value}&page=${page}`),


  
  trending: (media_type, time_window) =>  request.get(`trending/${media_type}/${time_window}`),

  similar: (type, value) =>  request.get(`${type}/${value}/similar`),
  recommend: (type, value) =>  request.get(`${type}/${value}/recommendations`),

  // 등장인물
  person : (type, value) => request.get(`${type}/${value}/credits`),

  video : (movie_id) => request.get(`movie/${movie_id}/videos`),
  social: (movie_id) => request.get(`movie/${movie_id}/external_ids`),
  image: (movie_id) => request.get(`movie/${movie_id}/images?&language=fr&include_image_language=fr,null,en`),


  // 언어 바꾸기
  mediaImages : (movie_id) => request.get(`movie/${movie_id}/images?&language=en-US`),

  // 인물
  personWork: (person_id) => request.get(`person/${person_id}/combined_credits`),
  personTv: (person_id) => request.get(`person/${person_id}/tv_credits`),
  personSocial: (person_id) => request.get(`person/${person_id}/external_ids`),

  movieDetail: (type, id) => request.get(`${type}/${id}`),

  // 가장 인기있는 
  popularTv: () => request.get(`/tv/popular`),

  search: (keyword) =>
    request.get("search/multi", {
      params: {
        query: keyword,
      },
    }),
   
    personDetail: (id) =>
    request.get(`person/${id}`, {
      params: { append_to_response: "videos" },
    }),
};