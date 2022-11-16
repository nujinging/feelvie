<template>
  <Header></Header>
  <div class="container" :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + this.backGround + ')' }">
    <section class="detail_container">
      <div class="detail_info">
        <h1>{{ movieDetail.title }}</h1>
        <div class="meta">
          <span class="badge">15</span>
          <span class="txt" v-for="list in movieDetail.genres" :key="list.id">
            {{ list.name }}
          </span>
        </div>
        <a href="" class="trailer" v-if="movieDetail.videos?.results.length">
          트레일러 보기
        </a>
        <div class="comment">
          <p class="quotes">{{ movieDetail.tagline }}</p>
          <p class="intro">{{ movieDetail.overview }}</p>
        </div>
      </div>
      <div class="detail_poster">
        <ul class="social_links">
          <li>
            
            <a href="" class="facebook">
              <span class="blind">페이스북</span>
            </a>
          </li>
          <li>
            <router-link to="https://twitter.com/{{ socialLink.twitter_id }}" class="tritter" target="_blank">
              <span class="blind">검색</span>
            </router-link>
          </li>
          <li>
            <a href="" class="instargram">
              <span class="blind">인스타그램</span>
            </a>
          </li>
          <li>
            <a href="" class="just_watch">
              <span class="blind">인스타그램</span>
            </a>
          </li>
          <li>
            <a href="" class="link">
              <span class="blind">인스타그램</span>
            </a>
          </li>
        </ul>
        <picture>
          <img :src="image(movieDetail.poster_path)" alt="Image 2">
        </picture>
      </div>
    </section>
  </div>

  <ul v-if="similarList">
    <li v-for="item in similarList" :key="item.id" >
      {{ item.title }}
    </li>
  </ul>
  <ul v-if="personList">
    <li v-for="item in personList" :key="item.id">
      <img :src="profile(item.profile_path)" alt="Image 2">
      {{ item.original_name }}
    </li>
  </ul>
</template>

<script>
import Header from './Header.vue'
import { movieApi } from '../utils/axios';

export default {
  name: 'ItemDetail_',
  props: ['movieList'],
  data() {
    return {
      movieDetail: {},
      Bg: 'red',
      similarList: {},
      personList: {},
      backGround:'',
      socialLink: {},
    };
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    profile(img) {
      return `https://image.tmdb.org/t/p/w138_and_h175_face/${img}`
    },
    
  },
  async mounted() {
    const { id } = this.$route.params;
    const { data } = await movieApi.movieDetail(id);
    this.movieDetail = data;
    // console.log(this.movieDetail)
    this.backGround = this.movieDetail.backdrop_path
    // console.log(this.backGround)
    
    const similar = await movieApi.similar(this.movieDetail.id);
    this.similarList = similar.data.results

    const person = await movieApi.person(this.movieDetail.id);
    this.personList = person.data.cast;

    const mediaImages = await movieApi.mediaImages(this.movieDetail.id);
    console.log(mediaImages)


    const social = await movieApi.social(this.movieDetail.id);
    this.socialLink = social.data
    console.log(this.socialLink)


    

  },
  components: {
    Header,
  }
}
</script>
<style>
.detail_container {position:relative;display:flex;margin-bottom:110px;padding:3.125vw 3.125vw 10.125vw ;color:#fff}

.detail_container .detail_info {position:relative;flex:2;margin-right:50px;width:100%;z-index:1}
.detail_container .detail_info h1 {margin-top:50px;font-size:40px}
.detail_container .detail_info .meta {margin-top:15px}
.detail_container .detail_info .meta .badge {display:inline-block;margin-right:8px;padding:0 8px;color:#fff;font-size:14px;line-height:20px;border:1px solid #fff;border-radius:4px;background:#000}
.detail_container .detail_info .trailer {margin-top:30px;display:inline-block;padding:20px 0;width:315px;font-size:24px;border-radius:4px;text-align:center;background:#fff}
.detail_container .detail_info .comment {position:absolute;bottom:0}
.detail_container .detail_info .comment .quotes {margin-bottom:32px;color:#3A7CDF;font-size:24px;font-style:italic;}
.detail_container .detail_info .comment .intro {display:-webkit-box;font-size:20px;line-height:24px;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:3;-webkit-box-orient:vertical}

.detail_container .detail_poster {position:relative;display:flex;justify-content:flex-end;flex:1;width:100%;z-index:1}
.detail_container .detail_poster picture {margin-left:30px}
.detail_container .detail_poster .social_links {}
.detail_container .detail_poster .social_links li {display:flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:#fff}
.detail_container .detail_poster .social_links li+li {margin-top:15px}
.detail_container .detail_poster .social_links li a {width:50px;height:50px;background:#000}
.detail_container .detail_poster .social_links li a.facebook {}
.detail_container .detail_poster .social_links li a.tritter {}
.detail_container .detail_poster .social_links li a.instargram {}
.detail_container .detail_poster .social_links li a.link {}

/* .detail_container:before {position:absolute;top:0;left:0;width:100%;height:100%;background-image:linear-gradient(180deg, rgb(0 0 0 / 54%) 142px, rgb(0 0 0) 100%);content:''}
 */

.detail_container::before {
    content: "";
    position: absolute;
    inset: -10rem;
    background-color: rgba(0, 0, 0, 0.5);}
.detail_container::after { content: ""; position: absolute; bottom: -2px; left: -1rem; right: -1rem; height: 25rem; background-image: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0)); }


@media (max-width: 1024px) {
    .detail_container {position:relative;margin-bottom:50px}
    .detail_container .detail_info {margin-right:20px}
    .detail_container .detail_info h1 {margin-top:0;font-size:32px}
    .detail_container .detail_info .trailer {margin-top:15px;padding:15px 0;width:150px;font-size:16px}
    .detail_container .detail_info .meta+.comment{margin-top:66px}
    .detail_container .detail_info .comment {position:relative;margin-top:15px}
    .detail_container .detail_info .comment .quotes {margin-bottom:15px;font-size:16px}
    .detail_container .detail_info .comment .intro {font-size:16px;overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:5; -webkit-box-orient: vertical;}

    .detail_container .detail_poster picture {margin-left:15px}
    .detail_container .detail_poster picture img {width:200px}
    .detail_container .detail_poster .social_links li+li {margin-top:10px}
    .detail_container .detail_poster .social_links li {width:32px;height:32px}
    .detail_container .detail_poster .social_links li a {width:24px;height:24px;}
}
@media (max-width: 767px) {
    .detail_container {position:relative;margin-bottom:50px;display:block}
    .detail_container .detail_info {margin-right:20px}
    .detail_container .detail_info h1 {margin-top:0;font-size:28px}
    .detail_container .detail_info .trailer {margin-top:15px;padding:10px 0;width:150px;font-size:16px}
    .detail_container .detail_info .meta+.comment{margin-top:66px}
    .detail_container .detail_info .comment {position:relative;margin-top:15px}
    .detail_container .detail_info .comment .quotes {margin-bottom:15px;font-size:16px}
    .detail_container .detail_info .comment .intro {font-size:16px;overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp:4; -webkit-box-orient: vertical;}
    .detail_container .detail_poster {display:block}
    .detail_container .detail_poster picture {position:absolute;top:0;right:20px;margin-left:10px}
    .detail_container .detail_poster picture img {width:100px}
    .detail_container .detail_poster .social_links {margin-top:20px;display:flex}
    .detail_container .detail_poster .social_links li+li {margin-top:0;margin-left:10px}
    .detail_container .detail_poster .social_links li {width:32px;height:32px}
    .detail_container .detail_poster .social_links li a {width:24px;height:24px;}
    
}
</style>

