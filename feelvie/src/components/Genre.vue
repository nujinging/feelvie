<template>
  <ul v-if="genres" style="display:flex">
    <li v-for="genreList in genres" :key="genreList.id" @click="goDetail(genreList.id)" style="margin:0 10px">
      {{ genreList.name }}
    </li>
  </ul>
  <ul v-if="test" @scroll="handleNotificationListScroll" style="height: 500px;overflow: auto;">
    <li v-for="item in test" :key="item.id" @click="goDetail2(item.id)">
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
      test: {},
      page: '',
      page2: 1,
      genres: {}
    };
  },
  methods: {
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) this.handleLoadMore();
    },

    async handleLoadMore() {
      const { data } = await movieApi.genreList(this.page);
      console.log(data)

      // this.page.push(this.page2++)
    },

    async goDetail(value) {
      const { data } = await movieApi.genreList(value, this.page);
      this.test = data.results;

    },

    goDetail2(id) {
      this.$router.push(`/detail/${id}`);
    },
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },

  },
  async mounted() {
    const { data } = await movieApi.genre();
    this.genres = data.genres;
    console.log(this.genres);
  },
}
</script>

<style>

</style>