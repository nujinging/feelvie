<template>
  <Header></Header>
  <!-- <div class="container" :style="{ backgroundImage :`url(${background(movieDetail.backdrop_path)})`} "> -->
    <div class="container" :style="background" style>
    <section class="detail_container">
    <div class="detail_info">
      <h1>{{ movieDetail.title }}</h1>
      <div class="meta">
        <span class="badge">15</span>
        <span class="txt">가족,애니메이션,코미디</span>
      </div>
      <a href="" class="trailer" v-if="movieDetail.videos?.results.length">
        트레일러 보기
      </a>
      <div class="comment">
        <p class="quotes">{{ movieDetail.tagline }}</p>
        <p class="intro">
          {{ movieDetail.overview }}
        </p>
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
          <a href="" class="tritter">
            <span class="blind">트위터</span>
          </a>
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
    <ItemInfo></ItemInfo>
  </div>
  
</template>

<script>
import Header from './Header.vue'
import ItemInfo from './ItemInfo.vue';
import { movieApi } from '../utils/axios';

export default {
  name: 'item_detail',
  props: ['movieList'],
  data() {
    return {
      movieDetail: {},
      Bg: 'red'
    };
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
  },

  computed() {
  },

  async mounted() {
    console.log(this.$route);
    console.log(this.$route.params.id);
    const { id } = this.$route.params;
    const { data } = await movieApi.movieDetail(id);
    // axios 요청 보내기
    console.log(data);
    this.movieDetail = data;
    this.backGround = this.movieDetail.backdrop_path
  },
  components: {
    Header,
    ItemInfo
  }  
}
</script>

<style>
:root {--test-color: red;}
.detail_container {display:flex;margin-bottom:110px;padding:3.125vw 3.125vw 0;color:#fff;background:var(--test-color)}
.detail_container .detail_info {position:relative;flex:2;margin-right:50px;width:100%}
.detail_container .detail_info h1 {margin-top:50px;font-size:40px}
.detail_container .detail_info .meta {margin-top:15px}
.detail_container .detail_info .meta .badge {display:inline-block;margin-right:8px;padding:0 8px;color:#fff;font-size:14px;line-height:20px;border:1px solid #fff;border-radius:4px;background:#000}
.detail_container .detail_info .trailer {margin-top:30px;display:inline-block;padding:20px 0;width:315px;font-size:24px;border-radius:4px;text-align:center;background:#fff}
.detail_container .detail_info .comment {position:absolute;bottom:0}
.detail_container .detail_info .comment .quotes {margin-bottom:32px;color:#3A7CDF;font-size:24px;font-style:italic;}
.detail_container .detail_info .comment .intro {font-size:20px;line-height:24px}

.detail_container .detail_poster {position:relative;display:flex;justify-content:flex-end;flex:1;width:100%}
.detail_container .detail_poster picture {margin-left:30px}
.detail_container .detail_poster .social_links {}
.detail_container .detail_poster .social_links li {display:flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:50%;background:#fff}
.detail_container .detail_poster .social_links li+li {margin-top:15px}
.detail_container .detail_poster .social_links li a {width:50px;height:50px;background:#000}
.detail_container .detail_poster .social_links li a.facebook {}
.detail_container .detail_poster .social_links li a.tritter {}
.detail_container .detail_poster .social_links li a.instargram {}
.detail_container .detail_poster .social_links li a.link {}

.detail_container:before {position:absolute;top:0;left:0;width:100%;height:100%;background-image:linear-gradient(180deg, rgb(0 0 0 / 54%) 142px, rgb(0 0 0) 100%);content:''}


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