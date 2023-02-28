<template>
  <!-- 상단 -->
  <section class="detail_container skeleton"
    :style="{ backgroundImage: 'url( https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + this.backGround + ')' }">
    <!-- html이 없는데? 조건을 어떻게 걸어 -->
    <div class="detail_info" >
      <h1></h1>
      <div class="meta">
        <span class="txt" v-for="list in movieDetail.genres" :key="list.id">
          {{ list.name }}
        </span>
      </div>
      <div class="comment">
        <p class="quotes"></p>
        <p class="intro"></p>
      </div>
    </div>
    <div class="detail_poster">
      <ul class="social_links">
        <li v-if="this.facebookLink">
          <a :href="`https://facebook.com/${this.facebookLink}`" class="facebook" target="_blank">
            <span class="blind">페이스북</span>
          </a>
        </li>
        <li v-if="this.twitterLink">
          <a :href="`https://twitter.com/${this.twitterLink}`" class="tritter" target="_blank">
            <span class="blind">트위터</span>
          </a>
        </li>
        <li v-if="this.instagramLink">
          <a :href="`https://instargram.com/${this.instagramLink}`" class="instargram" target="_blank">
            <span class="blind">인스타그램</span>
          </a>
        </li>
      </ul>
      <picture>
        
      </picture>
    </div>
  </section>
  <!-- 등장인물 -->
  <div class="item_container movie">
    <div class="title">
      <h2>등장인물</h2>
    </div>
    <swiper :slidesPerView="'auto'" class="mySwiper person_list" v-if="personList">
      <swiper-slide class="person_card" v-for="person in personList" :key="person.id" @click="goPeronDetail(person.id)">
        <picture>
          <img :src="profile(person.profile_path)" alt="Image 2">
        </picture>
        {{ person.original_name }}
      </swiper-slide>
      <swiper-slide v-if="this.personList.length >= 10">
        <router-view>더보기</router-view>
      </swiper-slide>
    </swiper>

    <div class="media_container">
      <div class="media_top">
        <h3 class="tit">미디어</h3>
        <!-- 탭 영역 -->
        <ul class="media_tab">
          <li v-for="(tab, index) in tabList" :key="index" :class="{ active: currentTab === index }">
            <button @click.prevent="currentTab = index">{{ tab }} </button>
          </li>
        </ul>
      </div>
      <!-- 미디어 1 -->
      <div v-show="currentTab == 0" class="media_list">
        <swiper :slidesPerView="'auto'" class="mySwiper" v-if="imageList.posters">
          <swiper-slide v-for="backdrops in imageList.posters" :key="backdrops.id"
            @click="modal = true, img = backdrops.file_path, width = backdrops.width, height = backdrops.height">
            <img :src="profile(backdrops.file_path)" alt="Image 2">
          </swiper-slide>
        </swiper>
      </div>

      <!-- 미디어 2 -->
      <div v-show="currentTab == 1" class="media_list bg">
        <swiper :slidesPerView="'auto'" class="mySwiper" v-if="imageList.backdrops">
          <swiper-slide v-for="backdrops in imageList.backdrops" :key="backdrops.id"
            @click="modal = true, img = backdrops.file_path, width = backdrops.width, height = backdrops.height">
            <img :src="profile(backdrops.file_path)" alt="Image 2">
          </swiper-slide>
        </swiper>
      </div>
      <!-- 미디어 3 -->
      <div v-show="currentTab == 2" class="media_list video">
        <swiper :slidesPerView="'auto'" class="mySwiper" v-if="videoLink">
          <swiper-slide v-for="video in videoLink" :key="video.id">

            <iframe :src="`https://youtube.com/embed/${video.key}`" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
            <a :href="`https://youtube.com/embed/${video.key}`" style="color:#fff">
              {{ video.name }} </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="title">
      <h2>추천 작품</h2>
    </div>
    <ItemList :movieList="recommendList" :type="this.type" :title="title[0]" :photo="recommend_photo"></ItemList>
  </div>

</template>

<script>
import ItemList from './ItemList.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
export default {
  name: 'ItemDetail_',
  data() {
    return {
      backGround: '',
      movieDetail: {},
      imageList: [],
      currentTab: 0,
      tabList: ['포스터', '배경', '동영상'],
      title: ['추천 작품들', '이 영화와 비슷한 작품들'],
      modal: false,
      img: '',
      width: '',
      height: '',
      images: ['image_none.png'],
      isLoading: true,
      recommend_photo: '',
      recommendList: '',
      personList: '',
      videoLink: '',
      type: '',
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
    };
  },
  methods: {
    image(img) {
      return `https://image.tmdb.org/t/p/w400/${img}`
    },
    // 이미지
    profile(img) {
      if (img == undefined) {
        // 이미지 없을 때
        return require(`@/assets/${this.images}`)
      } else {
        return `https://image.tmdb.org/t/p/w185/${img}`
      }
    },
    goPeronDetail(id) {
      this.$router.push(`/person/${id}`);
    },
  },
  async created() {
    this.isLoading = false;
  },
  components: {
    Swiper,
    SwiperSlide,
    ItemList
  }
}
</script>
<style>
</style>


