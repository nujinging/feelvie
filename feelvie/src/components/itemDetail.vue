<template>
  <!-- 상단 -->
  <div class="container"
    :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + this.backGround + ')' }">
    <section class="detail_container">
      <div class="detail_info">
        <h1>
          {{ this.type ==  "movie" ? movieDetail.title : movieDetail.name }}
        </h1>
        <div class="meta">
          <span class="badge">15</span>
          <span class="txt" v-for="list in movieDetail.genres" :key="list.id">
            {{ list.name }}
          </span>
        </div>
        <div class="comment">
          <p class="quotes">{{ movieDetail.tagline }}</p>
          <p class="intro">{{ movieDetail.overview }}</p>
        </div>
      </div>
      <div class="detail_poster">
        <ul class="social_links">
          <li v-if="this.facebookLink">
            <a :href="`https://facebook.com/${this.facebookLink}`" class="facebook" target="_blank">
              <span class="blind">페이스북</span>
            </a>
          </li>
          <li v-if="this.twitterLink">
            <a :href="`https://twitter.com/${this.twitterLink}`" class="tritter" target="_blank">
              <span class="blind">트위터</span>
            </a>
          </li>
          <li v-if="this.instagramLink">
            <a :href="`https://instargram.com/${this.instagramLink}`" class="instargram" target="_blank">
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

  <!-- 등장인물 -->
  <div class="item_container">
    <div class="title">
      <h2>등장인물</h2>
    </div>
    <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="personList">
      <swiper-slide class="person_card" v-for="person in personList" :key="person.id" @click="goPeronDetail(person.id)">
        <img :src="profile(person.profile_path)" alt="Image 2">
        {{ person.original_name }}
      </swiper-slide>
    </swiper>
  </div>

  <!-- 미디어 -->
  <div class="container">
    <div class="tab_box">
      <h3>미디어</h3>
      <!-- 탭 영역 -->
      <ul class="tab-btn-list">
        <li v-for="(tab, index) in tabList" :key="index" :class="{ active: currentTab === index }">
          <a href="#" @click.prevent="currentTab = index">{{ tab }} </a>
        </li>
      </ul>
    </div>
    <!-- 미디어 1 -->
    <div v-show="currentTab == 0" class="tab-cont">
      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="imageList.posters">
        <swiper-slide class="person_card" v-for="backdrops in imageList.posters" :key="backdrops.id">
          <img :src="profile(backdrops.file_path)" alt="Image 2">
        </swiper-slide>
      </swiper>
    </div>
    <!-- 미디어 2 -->
    <div v-show="currentTab == 1" class="tab-cont">
      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="imageList.backdrops">
        <swiper-slide class="person_card" v-for="backdrops in imageList.backdrops" :key="backdrops.id">
          <img :src="profile(backdrops.file_path)" alt="Image 2">
        </swiper-slide>
      </swiper>
    </div>
    <!-- 미디어 3 -->
    <div v-show="currentTab == 2" class="tab-cont">
      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="videoLink">
        <swiper-slide class="person_card" v-for="video in videoLink" :key="video.id">

          <iframe width="560" height="315" :src="`https://youtube.com/embed/${video.key}`" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
          <a :href="`https://youtube.com/embed/${video.key}`" style="color:#fff">
            {{ video.name }} </a>
        </swiper-slide>
      </swiper>
    </div>

  </div>
  
    <!-- 추천 작품 -->
    <ItemList :movieList="recommendList" :type="this.type" :title="title[0]" :photo="recommend_photo"></ItemList>

    <!-- 비슷한 작품 -->
    <ItemList :movieList="similarList" :type="this.type"  :title="title[1]" :photo="similar_photo"></ItemList>
</template>

<script>
import ItemList from './ItemList.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { movieApi } from '../utils/axios';

export default {
  name: 'ItemDetail_',
  data() {
    return {
      movieDetail: {},
      imageList: [],
      creditsList:[],
      currentTab: 0,
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
      tabList: ['포스터', '배경', '동영상'],
      title: ['추천 작품들', '이 영화와 비슷한 작품들'],
    };
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    profile(img) {
      return `https://image.tmdb.org/t/p/w138_and_h175_face/${img}`
    },
    goPeronDetail(id) {
      this.$router.push(`/person/${id}`);
    }
  },
  async mounted() {
    // 영화 ID값에 따른 정보
    const { type, id } = this.$route.params;
    const { data } = await movieApi.movieDetail(type, id);
    this.movieDetail = data;
    this.type = type


    // 배경
    this.backGround = this.movieDetail.backdrop_path

    // 등장인물
    const person = await movieApi.person(this.type, this.movieDetail.id);
    this.personList = person.data.cast;
      
    // 관련 이미지
    const image = await movieApi.image(this.type, this.movieDetail.id);
    this.imageList = image.data

    // 관련 동영상
    const video = await movieApi.video(this.type, this.movieDetail.id);
    this.videoLink = video.data.results

    // 추천 작품
    const recommend = await movieApi.recommend(this.type, this.movieDetail.id);
    this.recommendList = recommend.data.results;
    this.recommend_photo = this.recommendList.map(key => key.poster_path)

    // 비슷한 작품
    const similar = await movieApi.similar(this.type, this.movieDetail.id);
    this.similarList = similar.data.results
    this.similar_photo = this.similarList.map(key => key.poster_path)

    // 소셜
    const social = await movieApi.social(this.type, this.movieDetail.id);
    this.facebookLink = social.data.facebook_id
    this.twitterLink = social.data.twitter_id
    this.instagramLink = social.data.instagram_id
  },
  components: {
    Swiper,
    SwiperSlide,
    ItemList
  }
}
</script>
<style>
.tab_box {display: flex;color: #fff}
.tab-btn-list {display: flex}
.tab-btn-list a {color: #fff}
.person_card {width: 138px}
.person_card img {display: block;width: 100%;height: 175px;}
.person_card h3 {margin-top: 10px;color: #fff;font-size: 16px}
@media (max-width: 767px) {.swiper-slide {width: 120px}.person_card img {width: 120px;height: 180px}}
.detail_container {position: relative;display: flex;margin-bottom: 110px;padding: 3.125vw 3.125vw 10.125vw;color: #fff}
.detail_container .detail_info {position: relative;flex: 2;margin-right: 50px;width: 100%;z-index: 1}
.detail_container .detail_info h1 {margin-top: 50px;font-size: 40px}
.detail_container .detail_info .meta {margin-top: 15px}
.detail_container .detail_info .meta .badge {display: inline-block;margin-right: 8px;padding: 0 8px;color: #fff;font-size: 14px;line-height: 20px;border: 1px solid #fff;border-radius: 4px;background: #000}
.detail_container .detail_info .trailer {margin-top: 30px;display: inline-block;padding: 20px 0;width: 315px;font-size: 24px;border-radius: 4px;text-align: center;background: #fff}
.detail_container .detail_info .comment {position: absolute;bottom: 0}
.detail_container .detail_info .comment .quotes {margin-bottom: 32px;color: #3A7CDF;font-size: 24px;font-style: italic;}
.detail_container .detail_info .comment .intro {display: -webkit-box;font-size: 20px;line-height: 24px;overflow: hidden;text-overflow: ellipsis;-webkit-line-clamp: 3;-webkit-box-orient: vertical}
.detail_container .detail_poster {position: relative;display: flex;justify-content: flex-end;flex: 1;width: 100%;z-index: 1}
.detail_container .detail_poster picture {margin-left: 30px}
.detail_container .detail_poster .social_links li {display: flex;align-items: center;justify-content: center;width: 72px;height: 72px;border-radius: 50%;background: #fff}
.detail_container .detail_poster .social_links li+li {margin-top: 15px}
.detail_container .detail_poster .social_links li a {width: 50px;height: 50px;background: #000}
.detail_container .detail_poster .social_links li a.facebook {background: url(./../assets/icon_facebook.png) center no-repeat}
.detail_container .detail_poster .social_links li a.tritter {background: url(./../assets/icon_twitter.png) center no-repeat}
.detail_container .detail_poster .social_links li a.instargram {background: url(./../assets/icon_instagram.png) center no-repeat}
.detail_container::before {content: "";position: absolute;inset: -10rem;background-color: rgba(0, 0, 0, 0.5);}
.detail_container::after {content: "";position: absolute;bottom: -2px;left: -1rem;right: -1rem;height: 25rem;background-image: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));}
@media (max-width: 1024px) {.detail_container {position: relative;margin-bottom: 50px}.detail_container .detail_info {margin-right: 20px}.detail_container .detail_info h1 {margin-top: 0;font-size: 32px}.detail_container .detail_info .trailer {margin-top: 15px;padding: 15px 0;width: 150px;font-size: 16px}.detail_container .detail_info .meta+.comment {margin-top: 66px}.detail_container .detail_info .comment {position: relative;margin-top: 15px}.detail_container .detail_info .comment .quotes {margin-bottom: 15px;font-size: 16px}.detail_container .detail_info .comment .intro {font-size: 16px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;}.detail_container .detail_poster picture {margin-left: 15px}.detail_container .detail_poster picture img {width: 200px}.detail_container .detail_poster .social_links li+li {margin-top: 10px}.detail_container .detail_poster .social_links li {width: 32px;height: 32px}.detail_container .detail_poster .social_links li a {width: 24px;height: 24px;}}
@media (max-width: 767px) {.detail_container {position: relative;margin-bottom: 50px;display: block}.detail_container .detail_info {margin-right: 20px}.detail_container .detail_info h1 {margin-top: 0;font-size: 28px}.detail_container .detail_info .trailer {margin-top: 15px;padding: 10px 0;width: 150px;font-size: 16px}.detail_container .detail_info .meta+.comment {margin-top: 66px}.detail_container .detail_info .comment {position: relative;margin-top: 15px}.detail_container .detail_info .comment .quotes {margin-bottom: 15px;font-size: 16px}.detail_container .detail_info .comment .intro {font-size: 16px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;}.detail_container .detail_poster {display: block}.detail_container .detail_poster picture {position: absolute;top: 0;right: 20px;margin-left: 10px}.detail_container .detail_poster picture img {width: 100px}.detail_container .detail_poster .social_links {margin-top: 20px;display: flex}.detail_container .detail_poster .social_links li+li {margin-top: 0;margin-left: 10px}.detail_container .detail_poster .social_links li {width: 32px;height: 32px}.detail_container .detail_poster .social_links li a {width: 24px;height: 24px;}}
</style>

