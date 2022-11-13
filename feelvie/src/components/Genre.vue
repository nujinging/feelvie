<template>
  <ul v-if="genreTitle" style="display:flex">
    <li v-for="genreList in genreTitle" :key="genreList.id" @click="GenreList(genreList.id)" style="margin:0 10px">
      {{ genreList.name }}
    </li>
  </ul>
  <ul v-if="list" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
    <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
      <img :src="image(item.poster_path)" alt="">
    </li>
  </ul>
</template>

<script>
import { movieApi } from '../utils/axios';

export default {
  name: 'Ganre_',
  data() {
    return {
      list: {},
      page: 1,
      genreTitle: {},
      genre: ''
    };
  },
   // Genre Title
   async mounted() {
    const { data } = await movieApi.genre();
    this.genreTitle = data.genres;
    console.log(this.genreTitle);
  },
  
  methods: {
    // 데이터가 두번 도는거 난중에 해결
    // Ganre List - Click
    async GenreList(value) {
      this.page = 1;
      this.list = [];
      this.genre = value;
      const { data } = await movieApi.genreList(this.genre, this.page);
      this.list = data.results;
      console.log(this.page)
    },

    // Scroll
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) this.handleLoadMore();
    },
    async handleLoadMore() {
      this.page++
      const { data } = await movieApi.genreList(this.genre, this.page)
      this.list = [...this.list, ...data.results]
      console.log(this.page)
    },

    // List Image
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },

    // Detail Page
    goDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
}
</script>

<style>

</style>