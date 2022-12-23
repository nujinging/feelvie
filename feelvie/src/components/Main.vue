<template>
  <div class="container">
    <swiper :pagination="pagination" :navigation="true" :modules="modules"  class="mySwiper home_banner">
      <swiper-slide v-for="list in list" :key='list.id'
        :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + list.backdrop_path + ')' }"
        @click="goDetail(list_type, list.id)">
        <div class="banner_txt">
          <h2 class="tit"> {{ list.title }} </h2>
          
          <p> {{ list.overview }}</p>
        </div>
      </swiper-slide>
    </swiper>


    <div class="item_container">



      <!-- 지금 상영중인 영화 -->
      <div class="title">
        <h2>지금 상영중이에요!</h2>
        <ul class="type_list">
          <li>
            <button type="button" @click="ganreTab('movie', 'now_playing')">영화</button>
          </li>
          <li>
            <button type="button" @click="ganreTab('tv', 'on_the_air')">TV</button>
          </li>
        </ul>
      </div>
      <ItemList :movieList="nowPlaying" :type="list_type" :title="title[0]" :photo="now_photo"></ItemList>

      <!-- 가장 인기있는 컨텐츠 -->
      <div class="title">
        <h2>가장 인기있는 컨텐츠</h2>
      </div>
      <ItemList :movieList="TopRatedList" :type="list_type" :title="title[2]" :photo="top_photo"></ItemList>

      <!-- 오늘 가장 많이 찾아 본 컨텐츠 -->
      <div class="title">
        <h2>오늘 가장 많이 찾아 본 컨텐츠</h2>
      </div>
      <ItemList v-if="dayList" :movieList="dayList" :type="list_type" :title="title[0]" :photo="day_photo"></ItemList>


      <!-- 이번 주 가장 많이 찾아 본 컨텐츠 -->
      <div class="title">
        <h2>이번 주 가장 많이 찾아 본 컨텐츠</h2>
      </div>
      <ItemList :movieList="weekList" :title="title[1]" :photo="week_photo"></ItemList>
    </div>


  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import ItemList from './ItemList.vue'
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { movieApi } from '../utils/axios';

export default {
  name: 'Main_',
  data() {
    return {
      nowPlaying: {},
      popular: {},
      TopRatedList: {},

      title: ['지금 상영중인 영화', '인기있는 영화', '최고의 등급'],
      popularTv: [],
      popularMovie: [],
      dayList: [],
      list_type: 'movie',
      list:[],
      list2: [],
      weekList: [],
      nowType: '',
      listInfo:
        [
          { title: '지금 상영중인 영화', photo: this.now_photo },
          { title: '인기있는 영화', photo: this.pop_photo },
          { title: '최고의 등급', photo: this.pop_photo },
        ],
    }
  },
  methods: {
    goDetail(type, id) {
      this.$router.push(`/${type}/${id}`);
    },

    async ganreTab(id, nowType) {
      this.list_type = id;
      const now = await movieApi.nowPlaying(this.list_type, nowType);
      this.nowPlaying = now.data.results;

      console.log(this.list_type)


      this.now_photo = this.nowPlaying.map(key => key.poster_path)
      this.top_photo = this.TopRatedList.map(key => key.poster_path)
      
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ItemList
  },
  async mounted() {
    const now = await movieApi.nowPlaying(this.list_type, 'now_playing');
    this.nowPlaying = now.data.results;
    console.log(this.nowPlaying)
    const TopRated = await movieApi.TopRated(this.list_type);
    this.TopRatedList = TopRated.data.results;

    this.now_photo = this.nowPlaying.map(key => key.poster_path)
    this.top_photo = this.TopRatedList.map(key => key.poster_path)


    // 기존에 뿌려주고 클릭 시 재랜더링...!?!!!
    const trendingDay = await movieApi.trending(this.list_type, 'day');
    const trendingWeek = await movieApi.trending(this.list_type, 'week');

    this.dayList = trendingDay.data.results
    this.weekList = trendingWeek.data.results

    this.day_photo = this.dayList.map(key => key.poster_path)
    this.week_photo = this.weekList.map(key => key.poster_path)


    // 배너
    const popularTv = await movieApi.popularTv('movie');
    this.popularTv = popularTv.data.results;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    this.list = this.popularTv.filter(value => korean.test(value.title) && korean.test(value.overview)).splice(0, 5);

    this.backGround = this.popularTv.backdrop_path
  },
  setup() {
    return {
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + `<span class="blind">` + (index + 1) + `</span>` + "</span>";
        },
      },
      modules: [Navigation, Pagination],
    };
  },
}
</script>

<style>
.home_banner {position:relative;height:600px;margin-bottom:100px}
.home_banner .banner_txt {position:absolute;left:50px;bottom:50px}
.home_banner .banner_txt .tit {font-size:40px}
.home_banner .banner_txt p {margin-top:30px;font-size:24px;line-height:34px}

.swiper-button-prev,
.swiper-button-next {width:100px;height:150px;transform:translateY(-50%);z-index:10}
.swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {pointer-events:auto}


.swiper-pagination {display:flex;justify-content:center;margin:15px auto 0}
.swiper-pagination-bullet {display:block;width:16px;height:16px;border-radius:8px;background:#fff;cursor:pointer}
.swiper-pagination-bullet+.swiper-pagination-bullet {margin-left:8px}
.swiper-pagination-bullet.swiper-pagination-bullet-active {background:red}


@media (max-width: 767px) {

  .home_banner {height:300px;margin-bottom:50px}
  .swiper-slide {background-size:cover;background-position:center}
  .home_banner .banner_txt {left:25px;bottom:25px;width:calc(100vw - 75px)}
  .home_banner .banner_txt .tit {font-size:20px}
  .home_banner .banner_txt p {margin-top:15px;font-size:16px;line-height:24px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box; -webkit-line-clamp: 2;-webkit-box-orient: vertical;}


  .swiper-pagination-bullet {width:12px;height:12px}
}
</style>