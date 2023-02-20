<template>
  <swiper :slidesPerView="'auto'"  class="mySwiper skeleton">
    <swiper-slide class="item_card">
      <img src="" alt="Poster">
      <h3></h3>
    </swiper-slide>
    <swiper-slide class="item_card">
      <img src="" alt="Poster">
      <h3></h3>
    </swiper-slide>
    <swiper-slide class="item_card">
      <img src="" alt="Poster">
      <h3></h3>
    </swiper-slide>
    <swiper-slide class="item_card">
      <img src="" alt="Poster">
      <h3></h3>
    </swiper-slide>
    <swiper-slide class="item_card">
      <img src="" alt="Poster">
      <h3></h3>
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
  data() {
    return {
      isLoading: true,
    }
  },
  props: ['movieList', 'title', 'photo', 'type', 'listInfo'],
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w342/${img}`
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
 async mounted() {
  setTimeout(() => { this.isLoading = false }, '5000');
  },
}
</script>

<style>
.mySwiper.skeleton .item_card {width:18.75rem;height:28.125rem;background:#ddd}
.mySwiper.skeleton .item_card h3 {width:100%;height:22px;background:#ddd}


@media screen and (max-width: 768px) { 
  .item_container {padding:2.5rem}
  .item_card {width:12.25rem}
  .item_card+.item_card {margin-left:10px}
  .item_card img {height:18.375rem}
}

</style>