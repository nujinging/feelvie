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
</style>