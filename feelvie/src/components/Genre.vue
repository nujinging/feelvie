<template>
  <Header></Header>
  <div class="container">
    <div class="item_container">

      <swiper :slidesPerView="'auto'" :spaceBetween="20" class="mySwiper" v-if="genres">
        <swiper-slide class="category_list" v-for="genreList in genres" :key="genreList.id" @click="goDetail(genreList.id)" >
          {{ genreList.name }}
        </swiper-slide>
      </swiper>

      <ul v-if="test" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
        <li v-for="item in test" :key="item.id" @click="goDetail2(item.id)">
          <img :src="image(item.poster_path)" alt="">
        </li>
      </ul>
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
      test: {},
      page: '',
      page2: 1,
      genres: {}
    };
  },
  methods: {
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) this.handleLoadMore();
    },

    async handleLoadMore() {
      const { data } = await movieApi.genreList(this.page);
      console.log(data)

      // this.page.push(this.page2++)
    },

    async goDetail(value) {
      const { data } = await movieApi.genreList(value, this.page);
      this.test = data.results;

    },

    goDetail2(id) {
      this.$router.push(`/detail/${id}`);
    },
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  },
  async mounted() {
    const { data } = await movieApi.genre();
    this.genres = data.genres;
    console.log(this.genres);
  },
  components: {
    Header,
    Swiper,
    SwiperSlide
  }
}
</script>

<style>
.category_list {width:auto;padding:10px 20px;color:#fff;font-size:20px;border-radius:32px;cursor:pointer;background:#0372D2}
.category_list:hover {color:#0372D2;background:#fff}
</style>