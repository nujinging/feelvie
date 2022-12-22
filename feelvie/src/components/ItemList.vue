<template>
  <swiper :slidesPerView="'auto'" :spaceBetween="30" class="mySwiper">
    <swiper-slide class="item_card" v-for="(li, idx) in movieList" :key="li.id" @click="goDetail(type, li.id)">
      <!-- <img :src="image(photo[idx])" alt="Poster" v-if="photo" @error="replaceByDefault"> -->
      <img :src="image(photo[idx])" alt="Poster" v-if="photo">
      <h3> {{ li.title }}</h3>
      <h3> {{ li.name }}</h3>
    </swiper-slide>
  </swiper>
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
  props: ['movieList', 'title', 'photo', 'type', 'listInfo'],
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w342/${img}`
    },
    goDetail(type, id) {
      this.$router.push(`/${type}/${id}`);
    },
    // replaceByDefault(e) {
    //   e.target.src = '@/assets/image_none.png'
    // }
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
.item_container {padding:3.888rem}
.item_card {width:300px}
.swiper {overflow:visible}
.swiper+.title {margin-top:5rem}
.swiper-wrapper {transform: translateZ(0)}
.item_card:hover {transform: translate3d(0,-0.75rem,0);transition: transform .3s ease-in-out;cursor:pointer}
.item_card img {display:block;width:100%;height:450px;border-radius:8px}
.item_card h3 {margin-top:15px;color: #d5d5d5;font-size:22px;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media (max-width: 767px) {.swiper-slide {width: 120px}.item_card img {width: 120px;height: 180px}}
</style>