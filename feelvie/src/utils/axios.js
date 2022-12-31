import axios from "axios";

const request = axios.create({
  /**
   * [review] api_key 와 같은 보안적인 요소는 커밋에 남지 않도록 하는 것이 좋음. (누군가 커밋 이력을 보고 탈취할 수도 있음)
   */
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "cb772a50acc4cd6917b12854484b9d91",
    language: "ko-KR",
  },

});
export const movieApi = {
  /**
   * [review] 공통 api 함수는 함수 이름에 api 라는 이름을 붙혀주면 좋겠음. + 동사형으로 선언 + camel case 로 명명
   * ex) nowPlaying -> getNowPlaying, topRated -> getTopRated
   */
  nowPlaying: (type, now) => request.get(`${type}/${now}`),
  popular: (type) => request.get(`${type}/popular`),
  TopRated: (type) =>  request.get(`${type}/top_rated`),


  // 장르 키워드
  genre: (value) =>  request.get(`genre/${value}/list`),
  // 장르 아이템 리스트
  genreList: (type, value, page) =>  request.get(`discover/${type}?with_genres=${value}&page=${page}`),


  
  trending: (media_type, time_window) =>  request.get(`trending/${media_type}/${time_window}`),

  // 리스트
  itemList : (type, value) => request.get(`${type}/${value}/lists`),

  // 등장인물
  person : (type, value) => request.get(`${type}/${value}/credits`),

  // 비슷한
  similar: (type, value) =>  request.get(`${type}/${value}/similar`),
  
  // 추천
  recommend: (type, value) =>  request.get(`${type}/${value}/recommendations`),

  video : (type, value) => request.get(`${type}/${value}/videos`),
  social: (type, value) => request.get(`${type}/${value}/external_ids`),
  image: (type, value) => request.get(`${type}/${value}/images?&language=fr&include_image_language=fr,null,en`),




  // 언어 바꾸기
  mediaImages : (movie_id) => request.get(`movie/${movie_id}/images?&language=en-US`),

  // 인물
  personWork: (person_id) => request.get(`person/${person_id}/combined_credits`),
  personTv: (person_id) => request.get(`person/${person_id}/tv_credits`),
  personSocial: (person_id) => request.get(`person/${person_id}/external_ids`),

  movieDetail: (type, id) => request.get(`${type}/${id}`),

  // 가장 인기있는 
  popularTv: (type) => request.get(`/${type}/popular`),

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