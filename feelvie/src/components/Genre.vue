<template>
  <Header></Header>
  <div class="container">
    <div class="item_container">

      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="genreTitle">
        <swiper-slide class="category_list" v-for="genreList in genreTitle" :key="genreList.id" @click="GenreList(genreList.id)">
          {{ genreList.name }}
        </swiper-slide>
      </swiper>
      
      <ul v-if="list" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
        <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
          <img :src="image(item.poster_path)" alt="">
        </li>
      </ul>
    </div>


    <div class="item_container">
      <div class="title">
        <h2>오늘 하루 가장 인기있는 컨텐츠</h2>
      </div>
        <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="dayList">
        <swiper-slide class="item_card" v-for="day in dayList" :key="day.id">
          <img :src="image(day.poster_path)" alt="">
        </swiper-slide>
        </swiper>
      </div>
      <div class="item_container">
      <div class="title">
        <h2>이번주 가장 인기있는 컨텐츠</h2>
      </div>
        <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="weekList">
        <swiper-slide class="item_card" v-for="week in weekList" :key="week.id">
          <img :src="image(week.poster_path)" alt="">
        </swiper-slide>
        </swiper>
      </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { movieApi } from '../utils/axios';

export default {
  name: 'Ganre_',
  data() {
    return {
      list: {},
      page: 1,
      genreTitle: {},
      genre: '',
      newList: {},
      dayList: {},
      weekList: {}
    };
  },
   // Genre Title
   async mounted() {
    const { data } = await movieApi.genre();
    this.genreTitle = data.genres;
    console.log(this.genreTitle);

    const trendingDay = await movieApi.trending('movie','day');
    const trendingWeek = await movieApi.trending('movie','week');
    this.dayList = trendingDay.data.results
    this.weekList = trendingWeek.data.results
    console.log(this.trendingDay)
  },

  methods: {
    
    
    // 데이터가 두번 도는거 난중에 해결
    // Ganre List - Click
    async GenreList(value) {
      this.page = 1;
      this.list = [];
      this.genre = value;
      const { data } = await movieApi.genreList(this.genre, this.page);
      this.list = data.results;
      console.log(this.page)
    },

    // Scroll
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) this.handleLoadMore();
    },
    async handleLoadMore() {
      this.page++
      const { data } = await movieApi.genreList(this.genre, this.page)
      this.list = [...this.list, ...data.results]
      console.log(this.page)
    },

    // List Image
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },

    // Detail Page
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  components: {
    Header,
    Swiper,
    SwiperSlide,
  }
}
</script>

<style>
.category_list {width:auto;padding:10px 20px;color:#fff;font-size:20px;border-radius:32px;cursor:pointer;background:#0372D2}
.category_list:hover {color:#0372D2;background:#fff}
</style>