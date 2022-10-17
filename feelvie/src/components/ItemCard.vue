<template>
      <swiper :slidesPerView="'auto'" :spaceBetween="30" :pagination="{
    clickable: true,
  }" :modules="modules" class="mySwiper">
    <swiper-slide class="item_card">
      <picture>
        <img v-if="movies.length !== 0" :src="`https:/image.tmdb.org/t/p/original${movies[7].poster_path}`">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>

    <swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>
    <swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>
    <swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>
    <swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>
    <swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide><swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide><swiper-slide class="item_card">
      <picture>
        <img class="loaded css-1a1r0s4 execn1x0"
          src="https://image.tving.com/upload/cms/caip/CAIP0900/P001637397.jpg/dims/resize/400" alt="작은 아씨들">
      </picture>
      <h3>디어 시스터</h3>

    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: 'Item_List',
  components: {
    Swiper,
    SwiperSlide,
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
</style>