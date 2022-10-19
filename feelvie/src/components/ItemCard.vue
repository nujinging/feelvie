<template>
    <swiper-slide class="item_card">
      <img :src="image(path)" alt="Image 2">
    </swiper-slide>
</template>
<script>
import { SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'Item_List',
  components: {
    SwiperSlide,
  },
  props: {
    path:Array
  },
 methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
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
.item_card {width:220px}
.item_card picture {display:block;height:330px;background:#fff}
.item_card picture img {width:100%}
.item_card h3 {margin-top:10px;color:#fff;font-size:16px}
@media (max-width: 767px) {
  .swiper-slide {width:120px}
  .item_card picture {width:120px;height:180px}
}
.item_card {color:#fff}
img {display:block}
</style>