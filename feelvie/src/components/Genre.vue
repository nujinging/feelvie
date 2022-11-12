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
      genres: {},
      genre: ''
    };
  },
  methods: {
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
      if (isAtTheBottom) this.handleLoadMore();
    },
    // 스크롤이 닿으면 호출되는 함수
    async handleLoadMore() {
      this.page2++
      const {data} = await movieApi.genreList(this.genre, this.page2)
      this.test = [...this.test, ...data.results];  // spread연산자 ==> 배열이나, 객체를 풀어내는 것
  
      console.log(this.page2)
      console.log(data);
    },

    async goDetail(value) {
      this.genre = value
      const { data } = await movieApi.genreList(this.genre, this.page2);
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