<template>
  <div class="container">
    <div class="item_container">
      <swiper
      :pagination="{
        dynamicBullets: true,
      }"
      :modules="modules"
      class="mySwiper home_banner"
    >
      <swiper-slide v-for="list in popularTv" :key='list.id'
      :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + list.backdrop_path + ')' }" @click="goDetail(list.id)">
      <div class="banner_txt">
        <h2 class="tit" v-if="list.name"> {{ list.name }}</h2>
        <p> {{ list.overview }}</p>
      </div>
      </swiper-slide>
    </swiper>
    </div>
    <div class="item_container list">
        <!-- 지금 상영중인 영화 -->
        <ItemList :movieList="nowPlaying" :type="list_type" :title="title[0]" :photo="now_photo" :listInfo="listInfo[0]"></ItemList>
        <!-- 인기있는 영화 -->
        <ItemList :movieList="popular" :type="list_type" :title="title[1]" :photo="pop_photo"></ItemList>
        <!-- 최고의 등급 -->
        <ItemList :movieList="TopRated" :type="list_type" :title="title[2]" :photo="top_photo"></ItemList>
    </div>
     
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import ItemList from './ItemList.vue'
import { Pagination } from "swiper";
import { movieApi } from '../utils/axios';

export default {
  name: 'Main_',
  data() {
    return {
      nowPlaying: {},
      popular : {},
      TopRated: {},
      title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],
      popularTv:[],
      list_type:'movie',
      listInfo:
        [
          {title: '지금 상영중인 영화', photo: this.now_photo},    
          {title: '인기있는 영화', photo: this.pop_photo },  
          {title: '최고의 등급',photo: this.pop_photo},    
        ],
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
  components: {
    Swiper,
    SwiperSlide,
    ItemList
  },
  async mounted() {
      const { data } = await movieApi.nowPlaying();
      this.movieList = data.results;
      const { nowPlaying, popular, TopRated } = movieApi;
      const requestArr = [nowPlaying, popular ,TopRated ];
      const [now, pop, top] = await Promise.all(
        requestArr.map((li) => li().then((res) => res.data.results))
      );
      this.nowPlaying = now;
      this.popular = pop;
      this.TopRated = top;

      this.now_photo = this.nowPlaying.map(key => key.poster_path)
      this.pop_photo = this.popular.map(key => key.poster_path)
      this.top_photo = this.TopRated.map(key => key.poster_path)



      const popularTv = await movieApi.popularTv();
      this.popularTv = popularTv.data.results;
      
      this.backGround = this.popularTv.backdrop_path
      console.log(this.popularTv)
      console.log(this.backGround)
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
}
</script>

<style>
.home_banner {position:relative;height:600px;margin-bottom:100px}

.home_banner .banner_txt {position:absolute;left:50px;bottom:50px}
.home_banner .banner_txt .tit {font-size:40px}
.home_banner .banner_txt p {margin-top:30px;font-size:22px}
</style>