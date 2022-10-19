<template>
  <div class="item_container">
    <Title></Title>
    <swiper :slidesPerView="'auto'" :spaceBetween="30" :pagination="{
      clickable: true,
    }" :modules="modules" class="mySwiper" v-if="movieList">
      <ItemCard v-for="li in movieList"
      :key="li.id" :path="li.poster_path"></ItemCard>
    </swiper>
    
  </div>
</template>
<script>
import Title from './Title.vue'
import ItemCard from './ItemCard.vue'
import { Swiper } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'Item_List',
  components: {
    Title,
    ItemCard,
    Swiper
  },
  props: ['movieList'],
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
.item_card {width:220px}
.item_card picture {display:block;height:330px;background:#fff}
.item_card picture img {width:100%}
.item_card h3 {margin-top:10px;color:#fff;font-size:16px}
@media (max-width: 767px) {
  .swiper-slide {width:120px}
  .item_card picture {width:120px;height:180px}
}
</style>