<template>
  <div class="item_container">
    <div class="title" v-if="title">
      <h2>{{ title }}</h2>
    </div>
    <!-- 리스트 -->

    <swiper :slidesPerView="'auto'" :spaceBetween="30" class="mySwiper">
      <swiper-slide class="item_card" v-for="(li, idx) in movieList" :key="li.id" @click="goDetail(type, li.id)">
        <img :src="image(photo[idx])" alt="Poster" v-if="photo">
        <h3> {{ li.title }}</h3>
        <h3> {{ li.name }}</h3>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'ItemList_',
  components: {
    Swiper,
    SwiperSlide
  },
  props:  {
    movieList: Object,
    title: String,
    photo: Object,
    type: String,
    listInfo: Object
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    goDetail(type, id) {
            this.$router.push(`/${type}/${id}`);
        },
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
}
</script>

<style>
</style>