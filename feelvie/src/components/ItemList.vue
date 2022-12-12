<template>
  <div class="item_container">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
    <swiper :slidesPerView="'auto'" :spaceBetween="30" class="mySwiper" v-if="movieList">
      <swiper-slide class="item_card" v-for="li in movieList" :key="li.id" @click="goDetail(li.id)">
        <img :src="image(li.poster_path)" alt="Poster">
        <img :src="image2(data2)" alt="Poster">
        <p>{{li.poster_path}}</p>
        <h3> {{ li.title }}</h3>
        <p>{{data2}}</p>
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
  data() {
      return {
      }
  },
  props: ['movieList', 'Title', 'data2'],

  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },
    image2(data2) {
      return `https://image.tmdb.org/t/p/w300/${data2}`
    },
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
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
.item_card {
  width: 220px
}

.item_card img {
  display: block;
  width: 100%;
  height: 330px;
}

.item_card h3 {
  margin-top: 10px;
  color: #fff;
  font-size: 16px
}

@media (max-width: 767px) {
  .swiper-slide {
    width: 120px
  }

  .item_card img {
    width: 120px;
    height: 180px
  }
}
</style>