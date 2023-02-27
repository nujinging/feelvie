<template>
  <swiper :slidesPerView="'auto'"  class="mySwiper skeleton">
    <swiper-slide class="item_card" v-for="li in count" :key="li.id">
      <img :src="require(`@/assets/${this.images}`)"/>
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
      images: ['image_none.png'],
      count: 6
    }
  },
}
</script>

<style>
.mySwiper.item_list .swiper-wrapper {animation:slidein 0.5s}
.mySwiper.skeleton .item_card {width:18.75rem;height:28.125rem;background:#ddd}
.mySwiper.skeleton .swiper-wrapper {overflow:hidden;position:relative;width:100%;height:100%}
.mySwiper.skeleton .swiper-wrapper::before {position:absolute;top:0;left:-100px;width:40px;height:100%;background:#ffffff3b;animation:skeletonMove 2s infinite;transform:rotate(15deg);content:"";filter:blur(15px);-webkit-filter:blur(15px);z-index:1}
@keyframes skeletonMove {from {left:-100px;
    }
    to {left:calc(100% + 100px);
    }}
@keyframes slidein {
  10% {
    opacity:0;
  }
  50% {
    opacity:0.5;
  }

  to {
    opacity:1;
  }
}
@media screen and (max-width: 768px) {
  .mySwiper.skeleton .item_card {width:12.25rem;height:100%;border-radius:0.5rem}
  .mySwiper.skeleton .item_card+.item_card {margin-left:10px}
  .mySwiper.skeleton .item_card img {height:18.375rem}
}
</style>