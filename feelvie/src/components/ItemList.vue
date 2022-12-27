<template>
  <swiper :slidesPerView="'auto'"  class="mySwiper">
    <swiper-slide class="item_card" v-for="(li, idx) in movieList" :key="li.id" @click="goDetail(type, li.id)">

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
.item_container {padding:3.888rem;overflow:hidden}
.item_card {width:18.75rem}
.item_card+.item_card {margin-left:30px}
.swiper {overflow:visible}
.swiper+.title {margin-top:3.125rem}
.swiper-wrapper {transform: translateZ(0)}
.item_card:hover {transform: translate3d(0,-0.75rem,0);transition: transform .3s ease-in-out;cursor:pointer}
.item_card img {display:block;width:100%;height:28.125rem;border-radius:0.5rem}
.item_card h3 {margin-top:0.938rem;color: #d5d5d5;font-size:1.375rem;font-weight:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}


@media screen and (max-width: 768px) { 
  .item_container {padding:2.5rem}
  .item_card {width:12.25rem}
  .item_card+.item_card {margin-left:10px}
  .item_card img {height:18.375rem}
}

</style>