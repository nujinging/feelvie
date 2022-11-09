<template>
  <ul v-if="genres" style="display:flex">
    <li v-for="genreList in genres" :key="genreList.id" @click="goDetail(genreList.id)" style="margin:0 10px">
      {{ genreList.name }}
    </li>
  </ul>
  <ul v-if="test" @scroll="handleNotificationListScroll" style="height: 500px;
  overflow: auto;">
    <li v-for="item in test" :key="item.id" @click="goDetail2(item.id)">
    <img :src="image(item.poster_path)" alt=""></li>
  </ul>
</template>

<script>
import { movieApi } from '../utils/axios';

export default {
  name: 'ganre_',
  data() {
    return {
      test: {},
      page : {},
      genres: {}
    };
  },
  watch: {
  },

  methods: {

    handleNotificationListScroll(e) {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const isAtTheBottom = scrollHeight === scrollTop + clientHeight;
    if(isAtTheBottom) {
      alert('2')
    }
  },

  // 내려오면 api를 호출하여 아래에 더 추가,
  handleLoadMore() {
    console.log("리스트 추가")
    // api를 호출하여 리스트 추가하면 됨, 현재는 pushList에 1개의 index 추가
    this.pushList.push(2)
  },

    async goDetail(value) {
      const { data } = await movieApi.genreList(value);
      this.test = data.results;
      this.page = data.page;
      console.log(this.test);
      console.log(data);
      console.log(data.page);
    },

    goDetail2(id){
      this.$router.push(`/detail/${id}`);
    },
    image(img) {
      return `https://image.tmdb.org/t/p/w300/${img}`
    },


  },
  components: {
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